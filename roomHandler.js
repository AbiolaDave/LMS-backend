const { v4: uuidV4 } = require("uuid");

const rooms = {};
const chats = {};

const roomHandler = (socket) => {
  const createRoom = () => {
    const roomId = uuidV4();
    rooms[roomId] = []; // Initialize room with an empty array
    socket.emit("room-created", { roomId });
    console.log(`Room created: ${roomId}`);
  };

  const joinRoom = (data) => {
    console.log(data);
    let roomId = data.roomId?.roomId || data.roomId;
    let peerId = data.peerId;

    if (!rooms[roomId]) rooms[roomId] = [];

    socket.join(roomId);
    socket.emit("get-messages", chats[roomId] || []);
    console.log(`User ${peerId} joined room ${roomId}`);
    rooms[roomId].push(peerId);
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", { peerId });
    socket.emit("get-users", {
      roomId,
      participants: rooms[roomId],
    });

    socket.on("disconnect", () => {
      console.log(`user ${peerId} left the room`, peerId);
      leaveRoom({ roomId, peerId });
    });
  };

  // const joinRoom = ({ roomId, peerId }) => {
  //   roomId = roomId?.roomId || roomId; // Fix incorrect object wrapping

  //   if (!roomId || !rooms[roomId]) {
  //     console.log("Room does not exist!");
  //     return;
  //   }

  //   rooms[roomId].push(peerId);
  //   socket.join(roomId);
  //   console.log(`User ${peerId} joined room ${roomId}`);

  //   socket.to(roomId).emit("user-joined", { peerId });
  //   socket.emit("get-users", { roomId, participants: rooms[roomId] });
  //   socket.on("disconnect", () => {
  //     console.log(`user ${peerId} left the room`, peerId);
  //     leaveRoom({ roomId, peerId });
  //   });
  // };

  const leaveRoom = ({ peerId, roomId }) => {
    if (!rooms[roomId]) return;

    rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);

    if (rooms[roomId].length === 0) {
      delete rooms[roomId];
      delete chats[roomId];
    }

    socket.to(roomId).emit("user-disconnected", peerId);
  };

  const startSharing = ({ peerId, roomId }) => {
    socket.to(roomId).emit("user-started-sharing", peerId);
  };

  const stopSharing = (roomId) => {
    socket.to(roomId).emit("user-stopped-sharing");
  };

   const addMessage = (roomId, message) => {
     console.log({ message });
     if (chats[roomId]) {
       chats[roomId].push(message);
     } else {
       chats[roomId] = [message];
     }
     socket.to(roomId).emit("add-message", message);
   };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
  socket.on("start-sharing", startSharing);
  socket.on("stop-sharing", stopSharing);
  socket.on("send-message", addMessage);
  socket.on("send-message", (roomId, message) => {
    console.log(`Received message for room: ${roomId}`, message);
    io.to(roomId).emit("add-message", message);
  });


};

module.exports = roomHandler;
