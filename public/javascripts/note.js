let contentChat = ''
Object.entries(response).forEach(entry => {
  const [key, value] = entry;
  // console.log(key, value.message);
  // console.log(value.message)
  contentChat = ` 
  <div class="d-flex p-3">
    <a class="avatar" href="#" >
        <img class="img-chats" src="/images/friend.png" alt="">
    </a>   
  <div class="message-row">
      <div class="d-flex align-items-center">
          <div class="message-content bg-message border-chats">
              <div>${value.message}</div>
              <div class="mt-1">
                  <small class="opacity-75">8 mins ago</small>
              </div>
          </div>
        </div>
    </div>
  </div>`
  //Thêm nội dung chat vào
  $('#contentMessages').append(contentChat)
   // window.history.pushState(0,0,`/message/${link}`)
});
// {/* <span><%=console.log(username)%></span>
//         <% Object.entries(messages).forEach(entry => { %>
//             <%  const [key, value] = entry%>
//             <%console.log(key, value.sender)%>
//             <%console.log(value.message)%>
            
//         <%})%> */}