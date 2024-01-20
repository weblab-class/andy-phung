/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./client/dist/index.html"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'left': 'left'
      },
      cursor: {
        'wait': 'url(https://cdn.discordapp.com/attachments/754243466241769515/1198090622574276638/mini_pet_icon.png?ex=65bda3d7&is=65ab2ed7&hm=965ce88739712a0b6e25dd591073672d57e28b9188d4bd3ca6891be1485f2bfe&), wait',
        's-resize': 'url(https://cdn.discordapp.com/attachments/754243466241769515/1198089397669724251/mini_laser_icon.png?ex=65bda2b3&is=65ab2db3&hm=f96c3597fef4ef6f6c5b00efa082bbae3bad09e2fe33640ccfe5d768ac2d1b90&), s-resize',
      }
    },
  },
  plugins: [],
}

