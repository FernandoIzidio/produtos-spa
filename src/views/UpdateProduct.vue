<script lang="ts">
import {defineComponent} from 'vue'
import {mapState} from "vuex";
import inputMask from "@/util/InputMask";
import validator from "@/util/Validator";

export default defineComponent({
  name: "UpdateProduct",
  data(){
    return {
      productId: this.$route.params.id,
      name: '',
      description: '',
      price: null as number | null,
      quantity: null as number | null,
      errorMessage: null as string | null
    }
  },
  computed: {
    ...mapState({
      user: (state:any) => state.user,
      token: (state:any) => state.token
    })
  },
  async created() {
    const response = await fetch(`http://localhost:3000/products/${this.productId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': this.token
      }});

    const responseText = await response.text();
    const responseObject = JSON.parse(responseText);
    this.name = responseObject.name;
    this.description = responseObject.description;
    this.price = responseObject.price;
    this.quantity = responseObject.quantity;

  },
  mounted() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const profileForm = document.getElementById('profileForm') as HTMLFormElement | null;
    const formElements = profileForm?.elements as HTMLFormControlsCollection | undefined;


    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", (e) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        validator.clearError("error-" + target?.id);
      })
    })

    if (editBtn && saveBtn && formElements) {
      editBtn.addEventListener('click', () => {
        if (editBtn.textContent === "Editar") {
          for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i] as HTMLInputElement;
            element.disabled = false;
          }

          editBtn.textContent = "Cancelar";
          saveBtn.style.display = 'block';
        } else {
          for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i] as HTMLInputElement;
            element.disabled = true;
          }

          editBtn.textContent = "Editar";
          saveBtn.style.display = 'none';
        }
      });

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as HTMLInputElement;
        element.disabled = true;
      }
    }
  },
  methods: {
    wordMask(field: any){
      inputMask.wordMask(this.$data, field)
    },
    quantityValidator(){
      if (this.quantity != null && this.quantity <= 0){
        validator.displayError('error-quantity', 'Quantidade tem que ser maior que 0')
      }
    },

    validateRequired(element: any, fieldName: any): boolean{
      return validator.validateRequired(element, fieldName)
    },

    async submitForm(){
      try {

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



        const response = await fetch('http://localhost:3000/products', {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            'x-access-token': this.token
          },
          body: JSON.stringify({
            id: this.productId,
            name: this.name,
            description: this.description,
            price: this.price,
            quantity: this.quantity
          })
        });


        if (!response.ok) {
          alert("Error updating product");
          return;
        }

        this.$router.push('/dashboard');

      } catch (error) {
        this.errorMessage = 'Falha ao cadastrar produto. Tente novamente.';
      }
    }
  }
})
</script>

<template>


  <section class="form-container">
    <header>
      <router-link to="/dashboard" id="backBtn" class="btn">
          Voltar
      </router-link>

      <a id="editBtn" class="btn">Editar</a>
    </header>
    <h1>Cadastro de Produto</h1>
    <form id="profileForm" @submit.prevent="submitForm">

      <div class="form-group">
        <label for="name">Nome:</label>
        <input id="name" v-model="name" type="text" @input="wordMask('name')" required @blur="validateRequired($event.target, 'Nome')" />
      </div>

      <div id="error-name" class="error"></div>

      <div class="form-group">
        <label for="description">Descrição:</label>
        <textarea id="description" v-model="description"  @blur="validateRequired($event.target, 'Descrição')" required ></textarea>
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
      <button type="submit" id="saveBtn" class="btn">Salvar</button>
    </form>
  </section>
</template>

<style scoped>
* {
  font-size: 14px;
}

.update-product-page .form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.update-product-page header{
  display: flex;
  justify-content: space-between;
}

.update-product-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.update-product-page .form-group {
  margin-bottom: 15px;
}

.update-product-page label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.update-product-page input, .update-product-page textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.update-product-page .error {
  color: red;
  margin-top: -5px;
  margin-bottom: 10px;
}

.update-product-page textarea {
  resize: vertical;
  height: 100px;
}

.update-product-page .error {
  color: red;
  margin-bottom: 10px;
}

.update-product-page .btn {
  color: white;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.update-product-page #editBtn {
  background-color: #5bc762;
}

.update-product-page #editBtn:hover {
  background-color: #76f87e;
}

.update-product-page #saveBtn {
  background-color: #4399ff;
  width: 100%;
  display: none;
}

.update-product-page #saveBtn:hover {
  background-color: #72aef6;
}

.update-product-page #backBtn {
  background-color: #f56666;
}


.update-product-page #backBtn:hover {
  background-color: #fa8e8e;
}

</style>
