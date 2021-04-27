import './main.css';
import styles from './index.module.css';
import "./sass/main-second.scss";
import "./js/script";

async function print() {
  // Here we are using dynamic import
  const { greet } = await import('./greet');
  const response = await greet('John Doe');
  console.log(response);
}

print();
