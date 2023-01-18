// let command = "stop";
// while (command !== "stop") {
//   command = prompt("Command");
// }
// alert("Stopped");

// do {
//   command = prompt("Command");
// } while (command !== "stop");
// alert("Stopped")

// let a = 2341;
// while (a > 1) {
//   console.log(a);
//   a = a / 10;
// }

// while (true) {
//   console.log("zxc");
// }
// bu infinite loop

// console.log("1")
// console.log("2")
// console.log("3")
// bu sinxronus, sinxronus degani bu tartib bilan ketish

// asinxronus bu sinxronusdagi tartibni buzmasdan run qiladi

// console.log("1");
// setTimeout(() => {
//   console.log("2");
// }, 3000);
// console.log("3");

const promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve("resolved");
  //   }, 300);
  reject(new Error("xato bo'ldi"));
});

// promise
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((err) => console.log(err))
//   .finally(() => console.log("finally"));

console.log("something");

async function getPromise(params) {
  try {
    const data = await promise;
    console.log(data);
  } catch (err) {
    console.log(err.toString());
  } finally {
    console.log("finally");
  }
}

// const fetchData = fetch("https://cat-fact.herokuapp.com/facts").then(data => console.log(data));
const elUl = document.querySelector("[data-ul]");
// const fetchData = fetch("https://cat-fact.herokuapp.com/facts").then((res) =>
//   res
//     .json()
//     .then((data) => renderFacts(data))
//     .catch((err) => renderError(err))
// );

async function getFacts() {
  try {
    elUl.innerHTML = `<li>Loading...</li>`
    const response = await fetch("https://cat-fact.herokuapp.com/facts");
    const facts = await response.json();

    renderFacts(facts);
  } catch (error) {
    renderError(error);
  }
}

function renderError(err) {
  elUl.innerHTML = `<li>${err}</li>`;
}

// console.log(fetchData);

function renderFacts(facts) {
  elUl.innerHTML = "";
  facts.forEach((fact) => {
    const elLi = document.createElement("li");
    elLi.textContent = fact.text;

    elUl.append(elLi);
  });
}

getPromise();
getFacts();