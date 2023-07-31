const auth = async () => {
  let allUsers = [];
  const reqBody = {
    email: "danny@devpipeline.com",
    password: "One2threesf@1",
  };

  await fetch("https://api.devpipeline.org/user/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  })
    .then((response) => response.json())
    .then((data) =>
      fetch("https://api.devpipeline.org/users", {
        headers: { auth_token: data.auth_info.auth_token },
      })
        .then((response) => response.json())
        .then((data) => (allUsers = data.users))
    );
  return allUsers;
};

(async () => {
  const users = await auth();

  const scrollContent = document.getElementById("scroll-content");

  users.forEach((user) => {
    const nameContainer = document.createElement("div");
    nameContainer.setAttribute("id", user.user_id);
    const header = document.createElement("h1");
    const num = document.createElement("h5");
    num.setAttribute("id", user.user_id + "total-num");
    num.innerHTML = 1;
    const plusBtn = document.createElement("button");
    plusBtn.setAttribute("id", "plus-button");
    plusBtn.addEventListener("click", () => {
      const currentNumPlusOne = Number(num.innerHTML) + 1;
      num.innerHTML = currentNumPlusOne;
    });
    const minusBtn = document.createElement("button");
    minusBtn.addEventListener("click", () => {
      const currentNumMinusOne = Number(num.innerHTML) - 1;
      num.innerHTML = currentNumMinusOne;
    });
    minusBtn.setAttribute("id", "minus-button");

    header.textContent = user.first_name;
    plusBtn.innerHTML = "+";
    minusBtn.innerHTML = "-";

    nameContainer.appendChild(header);
    nameContainer.appendChild(plusBtn);
    nameContainer.appendChild(minusBtn);
    nameContainer.appendChild(num);

    scrollContent.appendChild(nameContainer);
  });
})();

const getNameArray = async () => {
  let names = [];

  const users = await auth();
  users.forEach((user) => {
    const num = document.getElementById(user.user_id + "total-num").textContent;

    for (let i = 0; i < num; i++) {
      names.push(user.first_name);
    }
  });
  return names;
};

const generateName = async () => {
  const names = await getNameArray();
  const nameBox = document.getElementById("name-content");
  nameBox.innerHTML = names[Math.floor(Math.random() * names.length)];
};
