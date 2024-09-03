<script>
import NavBar from "@/components/NavBar.vue";
import {AddressForms} from "@/util/FormUtils";
import router from "@/router";
import mask from "@/util/InputMask";
import validator from "@/util/Validator";


export default {
  name: "HospitalRegisterView",
  components: {
    NavBar
  },
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        gender: "",
        username: "",
        password: "",
        password2: "",
        email: "",
        cellphone: "",
        cpf: "",
        birthdate: "",
        zip: "",
        street: "",
        houseNumber: "",
        neighborhood: "",
        city: "",
        state: ""
    },
      errors: {
        "username": "",
        "email": "",
        "cpf": "",
        "cellphone": ""
      },
      states: Object.values(AddressForms.STATE_DICTIONARY),
    };
  },
  mounted(){
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        validator.clearError("error-" + e.target.id);
      })
    })
  },
  methods: {
    wordMask(field){
      mask.wordMask(this.formData, field);
    },
    zipMask(){
      mask.zipMask(this.formData, "zip");
    },
    houseNumberMask(){
      mask.houseNumberMask(this.formData, "houseNumber");
    },
    userMask(){
      mask.userMask(this.formData, "username");
    },
    cellphoneMask(){
      mask.cellPhoneMask(this.formData, "cellphone");
    },
    cpfMask(){
      mask.cpfMask(this.formData, "cpf");
    },


    validateRequired(element, fieldName) {
      validator.validateRequired(element, fieldName);
    },



    validateZip(element){
      validator.validateZip(element);
    },

    validatePhone(element, fieldName, isCellphone=false) {
        validator.validatePhone(element, fieldName, isCellphone);
    },

    validateEmail(element) {
        validator.validateEmail(element);
    },

    clearGenderError(){
      validator.clearError("error-genderBio");
      const genderBackError = document.getElementById("back-error-genderBio");
      if (genderBackError) {
        genderBackError.remove();
      }
    },

    validateGenderSelection(){
      const genderOptions = document.querySelectorAll('input[name="gender"]');
      let isSelected = false;

      genderOptions.forEach(option => {
        if (option.checked) {
          isSelected = true;
        }
      });

      if (!isSelected) {
        validator.displayError("error-genderBio", "Selecione um Sexo Biológico.");
        return false;
      }

      this.clearGenderError();
      return true;
    },

    validatePasswordStrength(element){
      validator.validatePasswordStrength(element);
    },

    validatePasswordMatching(element){
      validator.validatePasswordMatching(element, this.formData.password)
    },


    validateCpf(element){
      validator.validateCpf(element);
    },

    clearBackError(e) {
      this.errors[e.target.id] = '';
    },

    async updateAddress(){
      if (!/^\d{5}-\d{3}$/.test(this.formData.zip)) return;
      const address = await AddressForms.getAddress(this.formData.zip);
      this.formData.street = address.logradouro;
      this.formData.city = address.localidade;
      this.formData.state = AddressForms.STATE_DICTIONARY[address.uf];
      this.formData.neighborhood = address.bairro;
    },

    async handleErrors(errorData) {
      const errorMap = {
        'usernameError': 'username',
        'emailError': 'email',
        'cpfError': 'cpf',
        'phoneError': 'cellphone'
      };

      this.errors = {};

      errorData.forEach(error => {
        const field = errorMap[error.field];
        this.errors[field] = error.defaultMessage;
      });


    },


    async sendRequest(event){

      let isValid = true;
      const inputs = event.target.querySelectorAll("input, select");

      inputs.forEach((input) => {
        isValid = this.validateRequired(input, "Este Campo")
      });

      isValid = this.validateGenderSelection();

      if (!isValid){
        window.scrollTo(0, 0);
        return;
      }


      const endpoint = 'http://localhost:3000/register';
      const data = {
          "id": null,
          "firstName": this.formData.firstName,
          "lastName": this.formData.lastName,
          "gender": this.formData.gender,
          "username": this.formData.username,
          "password": this.formData.password,
          "password2": this.formData.password2,
          "email": this.formData.email,
          "phone": this.formData.cellphone,
          "cpf": this.formData.cpf,
          "birthdate": this.formData.birthdate
      };



       try {

         const response = await fetch(endpoint, {
           method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });


        if (!response.ok) {
          const errorMessage = await response.text();
          window.scrollTo(0, 0);
          await this.handleErrors(JSON.parse(errorMessage));
          return;
        }

        await router.push('/login?success')
      } catch (error) {
         window.scrollTo(0, 0);
      }
    }
  }
}
</script>

<template>
  <NavBar></NavBar>
  <main>
    <h1>Registre-se Agora!</h1>

    <form action="/hospital/register" method="post" @submit.prevent="sendRequest">
      <fieldset>
        <legend>Dados do Cliente</legend>

        <label for="firstName">Nome:</label>
        <input type="text"
               id="firstName"
               name="firstName"
               v-model="formData.firstName"
               @blur="validateRequired($event.target, 'Primeiro Nome')"
               @input="wordMask('firstName')"
               required
        >

        <div id="error-firstName" class="error-message"></div>

        <label for="lastName">Sobrenome:</label>
        <input type="text"
               id="lastName"
               name="lastName"
               v-model="formData.lastName"
               @blur="validateRequired($event.target, 'Sobrenome')"
               @input="wordMask('lastName')"
               required>

        <div id="error-lastName" class="error-message"></div>

        <div id="genderBio">
          <label>Sexo Biológico:</label>
          <div class="genderContainer">
            <input type="radio"
                   id="masculino"
                   name="gender"
                   value="MASCULINO"
                   v-model="formData.gender"
                   @change="clearGenderError"
            >
            <label for="masculino">Masculino</label>
          </div>
          <div class="genderContainer">
            <input type="radio"
                   id="feminino"
                   name="gender"
                   value="FEMININO"
                   v-model="formData.gender"
                   @change="clearGenderError"
            >
            <label for="feminino">Feminino</label>
          </div>
          <div class="genderContainer">
            <input type="radio"
                   id="intersexo"
                   name="gender"
                   value="INTERSEXO"
                   v-model="formData.gender"
                   @change="clearGenderError"
            >
            <label for="intersexo">Intersexo</label>
          </div>
        </div>

        <div id="error-genderBio" class="error-message"></div>

        <label for="username">Nome de Usuário:</label>
        <input type="text"
               id="username"
               name="username"
               v-model="formData.username"
               @input="userMask"
               @blur="validateRequired($event.target, 'Nome de Usuário')"
               @focus="clearBackError($event)"
               required
        >

        <div v-show="errors.username" class="error-message back-error">{{ errors.username }}</div>

        <div id="error-username" class="error-message"></div>

        <label for="password">Senha:</label>
        <input type="password"
               id="password"
               name="password"
               v-model="formData.password"
               @blur="validatePasswordStrength($event.target)"
               required
        >

        <div id="error-password" class="error-message"></div>

        <label for="password2">Confirme a Senha:</label>
        <input type="password"
               id="password2"
               name="password2"
               v-model="formData.password2"
               @blur="validatePasswordMatching($event.target)"
               required
        >

        <div id="error-password2" class="error-message"></div>

        <label for="email">Email:</label>
        <input type="email"
               id="email"
               name="email"
               v-model="formData.email"
               @blur="validateEmail($event.target)"
               @focus="clearBackError($event)"
               required
        >

        <div v-show="errors.email" class="error-message back-error">{{ errors.email }}</div>

        <div id="error-email" class="error-message"></div>

        <label for="cellphone">Celular:</label>
        <input type="text"
               id="cellphone"
               name="phone"
               v-model="formData.cellphone"
               @input="cellphoneMask"
               @blur="validatePhone($event.target, 'Número de Celular', true)"
               @focus="clearBackError($event)"
               maxlength="15"
               required
        >

        <div v-show="errors.cellphone" class="error-message back-error">{{ errors.cellphone }}</div>

        <div id="error-cellphone" class="error-message"></div>

        <label for="cpf" >CPF:</label>
        <input type="text"
               id="cpf"
               name="cpf"
               v-model="formData.cpf"
               @input="cpfMask"
               @blur="validateCpf($event.target)"
               @change="clearBackError($event)"
               maxlength="14"
               required
        >

        <div v-show="errors.cpf" class="error-message back-error">{{ errors.cpf }}</div>

        <div id="error-cpf" class="error-message"></div>

        <label for="birthdate">Data de Nascimento:</label>
        <input type="date"
               id="birthdate"
               name="birthdate"
               v-model="formData.birthdate"
               @blur="validateRequired($event.target, 'Data de Nascimento')"
               required
        >

        <div id="error-birthdate" class="error-message"></div>


        <fieldset>
          <legend>Endereço </legend>

          <label for="hospitalZip" >CEP:</label>
          <input type="text"
                 id="hospitalZip"
                 name="zip"
                 v-model="formData.zip"
                 @change="updateAddress()"
                 @input="zipMask"
                 @blur="validateZip($event.target)"
                 maxlength="9"
                 required
          >

          <div id="error-hospitalZip" class="error-message"></div>


          <label for="hospitalStreet">Rua:</label>
          <input type="text"
                 id="hospitalStreet"
                 name="street"
                 v-model="formData.street"
                 @blur="validateRequired($event.target, 'Rua')"
                 @input="wordMask('street')"
                 required
          >

          <div id="error-hospitalStreet" class="error-message"></div>

          <label for="hospitalNeighborhood">Bairro:</label>
          <input type="text"
                 id="hospitalNeighborhood"
                 name="neighborhood"
                 v-model="formData.neighborhood"
                 @blur="validateRequired($event.target, 'Bairro')"
                 @input="wordMask('neighborhood')"
                 required
          >

          <div id="error-hospitalNeighborhood" class="error-message"></div>

          <label for="hospitalHouseNumber">Número:</label>
          <input type="text"
                 id="hospitalHouseNumber"
                 name="number"
                 v-model="formData.houseNumber"
                 @input="houseNumberMask"
                 @blur="validateRequired($event.target, 'Número')"
                 required
          >

          <div id="error-hospitalHouseNumber" class="error-message"></div>

          <label for="hospitalCity">Cidade:</label>
          <input type="text"
                 id="hospitalCity"
                 name="city"
                 v-model="formData.city"
                 @blur="validateRequired($event.target, 'Cidade')"
                 @input="wordMask('city')"
                 required
          >

          <div id="error-hospitalCity" class="error-message"></div>

          <label for="hospitalState">Estado:</label>
          <select id="hospitalState"
                  name="state"
                  v-model="formData.state"
                  @blur="validateRequired($event.target, 'Estado')"
          >
            <option value="" selected>-- Selecione --</option>
            <option :value="state" v-for="state in states" :key="state">
              {{state.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}}
            </option>
          </select>

          <div id="error-hospitalState" class="error-message"></div>
        </fieldset>


      </fieldset>

      <button type="submit">Enviar</button>
    </form>
  </main>
</template>

<style scoped>

.register-page {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}

.register-page main {
  width: 60%;
  margin: 2rem auto;
  padding: 2rem;
  font-size: 1.6rem;
  background-color: #ffffff;
  box-shadow: 0 0 1rem rgba(0,0,0,0.1);
  border-radius: 0.8rem;
}

.register-page h1 {
  text-align: center;
  color: #769eff;
  margin-bottom: 2rem;
}

.register-page fieldset {
  border: 0.2rem solid #86a9ff;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 0.8rem;
}

.register-page legend {
  color: #4c77af;
  font-size: 1.2em;
  padding: 0 1rem;
}

.register-page label {
  display: block;
  margin-bottom: 1rem;
  color: #333333;
}

.register-page input[type="text"],
.register-page input[type="email"],
.register-page input[type="password"],
.register-page input[type="date"],
.register-page select {
  width: calc(100% - 2.2rem);
  padding: 1rem;
  margin-bottom: 2rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.4rem;
  box-sizing: border-box;
}

.register-page input[type="radio"] {
  margin-right: 1rem;
}

.register-page .genderContainer {
  display: flex;
}

.register-page .genderContainer {
  margin-bottom: 0.3rem;
}

.register-page #genderBio {
  margin-bottom: 1.5rem;
}

.register-page .genderContainer > label {
  align-self: center;
}

.register-page #masculino,
.register-page #feminino,
.register-page #intersexo {
  align-self: start;
}

.register-page .error-message {
  color: red;
  font-size: 1.2rem;
  margin-top: -1.7rem;
  margin-bottom: 3rem;
}

.register-page .error-message + .error-message {
  margin-bottom: 3.2rem;
}

.register-page .error-message[id^="error-"] {
  display: none;
}

.register-page button {
  width: 100%;
  padding: 1.5rem;
  background-color: #4cafa0;
  color: white;
  border: none;
  border-radius: 0.4rem;
  font-size: 1.3rem;
  cursor: pointer;
}

.register-page #subdomain-result {
  display: none;
  margin-top: -0.8rem;
  padding-left: 1rem;
  color: #595959;
  margin-bottom: 1.5rem;
}

.register-page button:hover {
  background-color: #61c3b3;
}

</style>
