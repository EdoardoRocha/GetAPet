const createUserToken = require("../helpers/create-user-token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const getToken = require("../helpers/get-token");
const jwt = require("jsonwebtoken");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    //Validators
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return;
    }
    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória' });
      return;
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'A senhas não são iguais' });
      return;
    }

    //Check user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail' });
      return;
    }

    //Create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //Create a User
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    })

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }

  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    };

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória' });
      return;
    };

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.status(422).json({ message: 'Não há usuários cadastrados com esse E-mail' });
      return;
    }

    //Check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: 'Senha inválida!' });
      return;
    }

    await createUserToken(user, req, res)
  };

  static async checkUser(req, res) {

    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, process.env.AUTH_SECRET);

      currentUser = await User.findById(decoded.id);
      currentUser.password = null; //Removo a senha no retorno;

    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  };

  static async getUserById(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado'
      })
      return;
    } else {
      res.status(200).json({ user })
    }
  };

  static async editUser(req, res) {
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const {
      name,
      email,
      phone,
      password,
      confirmpassword
    } = req.body;

    if(req.file) {
      user.image = req.file.filename
    }

    //Validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório' });
      return;
    }

    //check if e-mail has already taken
    const userExists = await User.findOne({ email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
      return;
    }

    if (!email) {
      res.status(422).json({ message: 'O email é obrigatório' });
      return;
    }

    user.email = email;

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório' });
      return;
    }

    user.phone = phone;

    //Check if password match
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'A senhas não são iguais' });
      return;
    } else if (password === confirmpassword && password != null) {
      //Creating a new password
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {

      //return user updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user.id },
        { $set: user },
        { new: true }
      )


      res.status(200).json({
        message: 'Usuário atualizado com sucesso!'
      })

    } catch (error) {
      res.status(500).json({ message: error })
      return
    }
  };
};
