import Notiflix from "notiflix";

const refs = {
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  btnCreatePromise: document.querySelector('button[type="submit"]')

}

function createPromise(position, delay) {
  const promise = new Promise((resole, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resole({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
     
  });
  return promise;
}

refs.btnCreatePromise.addEventListener('click', onBtnCreatePromise);

function onBtnCreatePromise(evt) {
  
  evt.preventDefault();
  let firstDelay = Number(refs.delay.value);
  let stepDelay = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  for (let i = 0; i < amount; i += 1){
    createPromise(1 + i, firstDelay + i * stepDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    })
  }
  
  
}