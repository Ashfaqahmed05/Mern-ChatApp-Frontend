
export const sampleChats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Methew",
        _id: "1",
        groupChat: false,
        members: ["1", "2"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Alisa parker",
        _id: "2",
        groupChat: false,
        members: ["1", "2"]
    },
];

export const SampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Methew",
        _id: "1",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Jack Wilson",
        _id: "2",
    },
      {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Jack Wilson",
        _id: "3",
    },
    
];


export const SampleNotification = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Methew",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Jack Wilson",
        },
        _id: "2",
    },
];


export const sampleMessage = [
    {
        
        content: "Kesa Message hai",
        _id: "djksdfjslncv",
        sender:{
            _id: "user._id",
            name: "User Name "
        },
        chat: "chatId" ,
        createdAt: "4/16/2024, 2:00:32 AM"
    },
    {
        attachments: [
            {
                public_id: "asasas",
                url: "https://www.w3schools.com/howto/img_avatar.png"

           },
        ],
        _id: "djksdfjslncv 1",
        sender:{
            _id: "asasas0",
            name: "User Name 1 "
        },
        chat: "chatId" ,
        createdAt: "4/16/2024, 2:30:32 AM"
    }

]

export const dashboardData = {
    users: [
        {
            name: "john Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "1",
            username: "john_doe",
            friends: 20,
            groups: 5,
        },
        {
            name: "john Loges",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "2",
            username: "john_loges",
            friends: 15,
            groups: 8,
        },
    ],
    
    chats: [{
        name: "My Group" ,
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "1",
        groupChat: false,
        members: [{_id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png"}, {_id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png"}],
        totalMembers: 2,
        totalMessages: 5,
        creator: {
            name: "John Tide",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        }
    },
    {
        name: "Tech Group" ,
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "2",
        groupChat: true,
        members: [{_id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png"}, {_id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png"}],
        totalMembers: 62,
        totalMessages: 25,
        creator: {
            name: "Alex brayn",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
        }
    },

],

messages: [
{
    attachments: [],
    content: "What is this message",
    _id: "fskjvjklvbdhbvljn",
    sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "David",
    },
    chat: "chatId",
    groupChat: false,
    createdAt: "2024-02-12T10:41:30.630Z",
},
{
    attachements: [
        {
        public_id: "adjsnfs 2",
        url: "https://www.w3schools.com/howto/img_avatar.png"
        },
    ],
    content: "",
    _id: "dsjgshfvjklndfv",
    sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "David 4"
    },
    chat: "chatId",
    groupChat: true,
    createdAt: "2024-02-12T10:41:30.630Z",
}


]
}