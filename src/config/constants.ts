import enviroments from './enviroment';
if(process.env.NODE_ENV !== 'production') {
    const enviroment =enviroments;
}

const SECRET_KEY = process.env.SECRET ||  'AliandelDev';

export default SECRET_KEY;
