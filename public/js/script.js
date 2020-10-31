const inputForm = document.querySelector('#search-form');
const inputElement1 = document.querySelector('#input1');
const inputElement2 = document.querySelector('#input2');

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();

  for (let i = 1; i <= 5; i++) {
    document.getElementById(`message${i}`).style.display = 'none';
  }

  const userOneHandle = inputElement1.value;
  const userTwoHandle = inputElement2.value;

  document.getElementById('message3').style.display = 'block';
  document.getElementById('message3').innerHTML = '<img src="/img/loading.gif">';
  const searchUrl = window.location.href + 'contests?user1=' + userOneHandle + '&user2=' + userTwoHandle;

  fetch(searchUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.getElementById('message3').innerHTML = data.error;
        document.getElementById('message3').href = '#';
        document.getElementById('message3').target = '';
      } else {
        document.getElementById('message1').style.display = 'block';
        document.getElementById('message1').innerHTML = data[0].contestName;
        document.getElementById('message1').href = `https://codeforces.com/contest/${data[0].contestId}`;

        document.getElementById('message2').style.display = 'block';
        document.getElementById('message2').innerHTML = data[1].contestName;
        document.getElementById('message2').href = `https://codeforces.com/contest/${data[1].contestId}`;

        document.getElementById('message3').target = '_blank';
        document.getElementById('message3').innerHTML = data[2].contestName;
        document.getElementById('message3').href = `https://codeforces.com/contest/${data[2].contestId}`;

        document.getElementById('message4').style.display = 'block';
        document.getElementById('message4').innerHTML = data[3].contestName;
        document.getElementById('message4').href = `https://codeforces.com/contest/${data[3].contestId}`;

        document.getElementById('message5').style.display = 'block';
        document.getElementById('message5').innerHTML = data[4].contestName;
        document.getElementById('message5').href = `https://codeforces.com/contest/${data[4].contestId}`;
      }
    });
  });
});