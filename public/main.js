const socket = io()
$('.chat').on('submit',(e)=> {
  socket.emit('send message',$('.nickname').val(),$('.message').val())
  $('.message').val('')
  $('.message').focus()
  e.preventDefault()

})
socket.on('receive message', (msg)=> {
  $('.chat_log').append(msg+'\n')
  $('.chat_log').scrollTop($('.chat_log')[0].scrollHeight)
})
socket.on('change name' , (name)=> {
  $('.nickname').val(name)
})