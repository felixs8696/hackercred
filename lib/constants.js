const SessionInitObject = {
  users: {
    '507f191e810c19729de860ea': {
      _id: '507f191e810c19729de860ea',
      emails: ['bill@microsoft.com'],
      profile: {
        firstname: 'Bill',
        lastname: 'Gates',
        image: 'https://pbs.twimg.com/profile_images/558109954561679360/j1f9DiJi.jpeg'
      }
    },
    '094f129e012c92123ng923va': {
      _id: '094f129e012c92123ng923va',
      emails: ['mark@fb.com'],
      profile: {
        firstname: 'Mark',
        lastname: 'Zuckerberg',
        image: 'http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg'
      }
    }
  },
  chat: {
    messages: [{
        from: '507f191e810c19729de860ea',
        content: 'Here’s some documentation I wrote up about expectimax trees and probablistic modeling if you want some notes to follow along.',
        time_created: new Date(2016, 9, 18, 8, 30, 55, 0)
      },
      {
        from: '094f129e012c92123ng923va',
        content: 'In lecture Professor Hug also gave some tips about the difference between a reflex agent and a look ahead agent. Here’s the video.',
        time_created: new Date(2016, 9, 18, 8, 32, 15, 0)
      }
    ]
  },
  editor: {
    editor_mode: "python3"
  },
  video: {}
};

export default SessionInitObject;
