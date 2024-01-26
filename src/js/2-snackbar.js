import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const promForm = document.querySelector('.form');

promForm.addEventListener('submit', onSubForm);

function onSubForm(ent) {
    ent.preventDefault();

    const delay = parseInt(this.elements.delay.value);
    const radioState = this.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radioState === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
   
    promise.then((delay) => {
      iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'green',
          messageColor: 'white', 
       });       
    }).catch((delay) => {
         iziToast.show({       
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'red',
          messageColor: 'white', 
       });        
    });
};

