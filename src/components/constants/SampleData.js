import { Contrast } from "@mui/icons-material"

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
        _id: "2",
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