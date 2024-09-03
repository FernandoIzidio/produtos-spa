<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions } from "vuex";


export default {
  name: "LoginView",
  components: {
    NavBar
  },
  data() {
    return {
      username: "",
      password: "",
      showMessage: false,
      messageType: '',
      message: ''
    };
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
       if ('success' in newQuery) {
          this.displayMessage('success-message', 'Registro bem-sucedido!');
        } else if ('sessionExpired' in newQuery) {
          this.displayMessage('success-message', 'Sessão Expirada!');
        } else if ('logout' in newQuery) {
          this.displayMessage('success-message', 'Saiu com sucesso!');
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["login"]),
    displayMessage(type, text) {
      this.messageType = type;
      this.message = text;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    },
    async sendRequest() {
      try {

        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          this.displayMessage('error-message', 'Usuário ou senha inválidos, tente novamente.');
          return;
        }

        const responseText = await response.text();

        const responseObject = JSON.parse(responseText);

        await this.login(
            responseObject
        )

      } catch (Error){
        this.displayMessage('error-message', 'Usuário ou senha inválidos, tente novamente.');
      }
    }
  }
};
</script>

<template>
  <NavBar></NavBar>
  <main>
    <div v-show="showMessage" :class="['floating-message', messageType]">
      <p>{{ message }}</p>
    </div>

    <h1>Login</h1>

    <form @submit.prevent="sendRequest">
      <p>
        <label>Usuário:</label>
        <input type="text" v-model="username" name="username" />
      </p>
      <p>
        <label>Senha:</label>
        <input type="password" v-model="password" name="password" />
      </p>

      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </main>
</template>

<style scoped>

body {
  font-family: Arial, sans-serif;
  background-color: #d8e8ff;
}


.login-page main {
  width: 30%;
  margin: 10rem auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 0 1rem rgba(0,0,0,0.1);
  border-radius: 0.8rem;
  position: relative;
}

.login-page h1 {
  text-align: center;
  color: #4c77af;
  margin-bottom: 2rem;
}

.login-page label {
  font-size: 1.2rem;
  display: block;
  margin-bottom: 1rem;
  color: #333333;
}

.login-page input[type="text"],
.login-page input[type="password"] {
  width: calc(100% - 2.2rem);
  padding: 1rem;
  margin-bottom: 2rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.4rem;
  box-sizing: border-box;
}

.login-page button {
  width: 100%;
  padding: 1.5rem;
  background-color: #61c3b3;
  color: white;
  border: none;
  border-radius: 0.4rem;
  font-size: 1.3rem;
  cursor: pointer;
}

.login-page button:hover {
  background-color: #74c5ba;
}

.login-page .floating-message {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #4caf86;
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0,0,0,0.1);
  z-index: 1000;
  font-size: 1.6rem;
}

.login-page .floating-message.success-message {
  background-color: #18bc9c;
}

.login-page .floating-message.error-message {
  background-color: rgb(241, 93, 11);
}

.login-page .fade-out {
  animation: fadeOut 1s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
