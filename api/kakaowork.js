const { getTodayComitter, getYesterdayComitter } = require('./db');
const CONFIG = require('../config/config');
const axios = require('axios');

// const sendCheeringDM = () => {};

const sendMyBalance = () => {};

const sendAllPass = async () => {
  sendMessage({
    title: '🎉 ALL PASS',
    blocks: [
      {
        type: 'header',
        text: '🎉 ALL COMMIT❗️ 🎉',
        style: 'yellow',
      },
      {
        type: 'text',
        text: '⭐️ 모두들 고생했어요 ⭐️',
        markdown: true,
      },
    ],
  });
};

const sendYesterdayResult = async () => {
  let res = await getYesterdayComitter();
  let totalNumber = res['commit'].length + res['notCommit'].length;
  let achieve = Math.floor((res['commit'].length / totalNumber) * 100);

  sendMessage({
    title: '📣 어제 다들 열심히 커밋했어요~',
    blocks: [
      {
        type: 'header',
        text: '🌿 어제의 정원사들',
        style: 'yellow',
      },
      {
        type: 'text',
        text: `*🧑🏻‍💻 고생했어요~*\n👉 ${res['commit']}`,
        markdown: true,
      },
      {
        type: 'text',
        text: `*💢 어제 뭐함,,?*\n👉 ${res['notCommit']}`,
        markdown: true,
      },
      {
        type: 'divider',
      },
      {
        type: 'text',
        text: `⭐️ 어제 참석율: ${achieve}%`,
        markdown: true,
      },
    ],
  });
};

const sendTodayResult = async () => {
  let res = await getTodayComitter();
  let totalNumber = res['commit'].length + res['notCommit'].length;
  let achieve = Math.floor((res['commit'].length / totalNumber) * 100);

  sendMessage({
    title: '📣 커미터들 현황 알려드려요',
    blocks: [
      {
        type: 'header',
        text: '🌿 남은 시간 힘내봐요!',
        style: 'blue',
      },
      {
        type: 'text',
        text: `*🔥 곧 정원사가 될 사람들*\n👉 ${res['notCommit']}`,
        markdown: true,
      },
      {
        type: 'text',
        text: `*🧑🏻‍💻 오늘의 정원사들*\n👉 ${res['commit']}`,
        markdown: true,
      },
      {
        type: 'divider',
      },
      {
        type: 'text',
        text: `⭐️ 현재 참석율: ${achieve}%`,
        markdown: true,
      },
    ],
  });
};

const sendUserListMessage = () => {
  const members = CONFIG.member_list;
  const githubUsernames = CONFIG.member_list_github;

  let text = '';
  for (let i = 0; i < members.length; i++) {
    text += `[${members[i]}](https://github.com/${githubUsernames[i]}/) `;
  }

  sendMessage({
    title: '❗현재 참가 인원을 알립니다❗',
    blocks: [
      { type: 'header', text: '현재 참가 인원', style: 'blue' },
      {
        type: 'text',
        text: text,
        markdown: true,
      },
    ],
  });
};

const sendMessage = ({ title, blocks }) => {
  const data = JSON.stringify({
    conversation_id: CONFIG.kakaowork_conversation_id,
    text: title,
    blocks: blocks,
  });

  const config = {
    method: 'post',
    url: 'https://api.kakaowork.com/v1/messages.send',
    headers: {
      Authorization: 'Bearer ' + CONFIG.kakaowork_api,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

sendAllPass();
// sendTodayResult();
// sendYesterdayResult();

// sendTestMessage();