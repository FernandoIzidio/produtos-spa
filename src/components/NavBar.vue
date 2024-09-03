<script >
    export default {
      name: "NavBar"
    }
</script>

<template>
  <header>
    <h1 ><a href="/" id="logo">V i t r i n y</a></h1>
    <nav id="nav_header">
      <ul>

        <li><a href="#">Perguntas Frequentes</a></li>
        <li><a href="#">Suporte</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
      <div id="logSignIn">
        <router-link to="/login" id="login">Login</router-link>
        <router-link to="/register" id="signIn">Sign in</router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>
:root{
  font-size: 1rem;
}


header {
  display: flex;
  width: 100%;
  border-bottom: solid 0.1rem rgba(0, 0, 0, 0.13);
  box-sizing: border-box !important;
  max-width: 100% !important;

  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;

  background: rgb(216, 232, 255);
  padding: 1rem;
}

#logo {
  font-size: 4rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 550;
  color: rgba(41, 123, 245, 0.54);
  font-style: italic;
  text-decoration: none;
}

#nav_header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

#nav_header ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

#nav_header a {
  font-size: 1.8rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-decoration: none;
}

#nav_header a:hover {
  text-decoration: underline;
}

#logSignIn {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  border-radius: 5rem;
  background: rgb(88, 135, 255);
  font-weight: 600;
}

#login, #signIn {
  padding: 0.5rem 1rem;
  border-radius: 5rem;
  color: rgba(255, 255, 255, 0.89);
}

a:not(#login, #signIn, #logo):hover {
  color: #18bc9c;
}

a:not(#login, #signIn, #logo){
  color: #253e6b;
}

#login:hover, #signIn:hover {
  text-decoration: underline;
}

#signIn {
  background: rgb(33, 101, 202);
}
</style>
