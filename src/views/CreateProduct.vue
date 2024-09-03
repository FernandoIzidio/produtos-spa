<script lang="ts">
import { defineComponent } from 'vue';
import {mapState} from "vuex";
import inputMask from "@/util/InputMask";
import validator from "@/util/Validator";

export default defineComponent({
  name: 'CreateProduct',
  data() {
    return {
      name: '',
      description: '',
      price: null as number | null,
      quantity: null as number | null,
      errorMessage: null as string | null
    };
  },
  mounted() {
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        validator.clearError("error-" + target?.id);
      })
    })
    },
  computed: {
    ...mapState({
      user: (state:any) => state.user,
      token: (state:any) => state.token
    })
  },
  methods: {
    wordMask(field: any){
      inputMask.wordMask(this.$data, field)
    },


    validateRequired(element: any, fieldName: any): boolean{
      return validator.validateRequired(element, fieldName)
    },

    quantityValidator(){
      if (this.quantity != null && this.quantity <= 0){
        validator.displayError('error-quantity', 'Quantidade tem que ser maior que 0')
      }
    },

    async submitForm() {
      this.errorMessage = null;

      let isValid = true;
      const inputs = document.querySelectorAll("input, select, textarea");

      inputs.forEach((input)  => {
        if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
          isValid = this.validateRequired(input, "Este Campo");
        }
      });

      if (this.quantity != null && this.quantity <= 0){
        isValid = false;
      }

      if (!isValid){
        window.scrollTo(0, 0);
        return;
      }




      try {
        const response = await fetch('http://localhost:3000/products', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'x-access-token': this.token
          },
          body: JSON.stringify({
            name: this.name,
            description: this.description,
            price: this.price,
            quantity: this.quantity,
            userId: this.user.id
          })
        });


        if (!response.ok) {
          alert("Error creating product");
          return;
        }

        this.$router.push('/dashboard');

      } catch (error) {
        this.errorMessage = 'Falha ao cadastrar produto. Tente novamente.';
      }
    }
  }
});
</script>

<template>


  <div class="form-container">
    <router-link to="/dashboard" id="backBtn" class="btn">
        Voltar
    </router-link>
    <h1>Cadastro de Produto</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input id="name" v-model="name" type="text" @input="wordMask('name')" @blur="validateRequired($event.target, 'Nome')" required />

      </div>

      <div id="error-name" class="error"></div>


      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="description"  @blur="validateRequired($event.target, 'Descrição')" required></textarea>
      </div>


      <div id="error-description" class="error"></div>

      <div class="form-group">
        <label for="price">Preço:</label>
        <input id="price" v-model.number="price" type="number" step="0.01" @blur="validateRequired($event.target, 'Preço')" required />
      </div>

      <div id="error-price" class="error"></div>

      <div class="form-group">
        <label for="quantity">Quantidade:</label>
        <input id="quantity" v-model.number="quantity" type="number" @blur="quantityValidator" required />
      </div>

      <div id="error-quantity" class="error"></div>


      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <button type="submit" id="saveBtn" class="btn" >Cadastrar</button>
    </form>
  </div>
</template>

<style scoped>
  * {
    font-size: 14px;
  }

 .create-product-page .form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

 .create-product-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
   text-align: center;
}

 .create-product-page .form-group {
  margin-bottom: 15px;
}

 .create-product-page label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

 .create-product-page input, .create-product-page textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

 .create-product-page textarea {
  resize: vertical;
  height: 100px;
}

 .create-product-page .error {
  color: red;
   margin-top: -5px;
  margin-bottom: 10px;
}

 .create-product-page button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

 .create-product-page .btn {

     color: white;
     padding: 8px 10px;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     font-weight: bold;

 }


  .create-product-page #saveBtn {
    background-color: #4399ff;
    width: 100%;
  }

  .create-product-page #saveBtn:hover {
    background-color: #72aef6;
  }

  .create-product-page #backBtn {
    background-color: #f56666;
  }

  .create-product-page #backBtn:hover {
    background-color: #fa8e8e;
  }




</style>
