import bcryptjs from 'bcryptjs';
export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcryptjs.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

