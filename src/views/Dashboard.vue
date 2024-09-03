<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from "vuex";
import GenderIconCase from "@/components/GenderIconCase.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard.vue",
  components: {
    GenderIconCase
  },
  data(){
    return {
      products: [],
    }
  },
  computed: {
    ...mapState({
      user: (state:any) => state.user,
      token: (state:any) => state.token,
    })
  },
  methods: {
    ...mapActions(["logout"]),

    async doLogout(){
      await this.logout();
      this.$router.push("/login?logout");
    },

    async deleteProduct(id: any) {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            'x-access-token': this.token
          }
        });

        if (!response.ok) {
          alert('Erro ao remover producto');
        }

        this.$router.push('/dashboard')

      } catch (error){
        console.error(error);
      }
      }
  },
  async mounted() {
    try {
      const response = await fetch(`http://localhost:3000/user/products`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          'x-access-token': this.token
        }
      });

      const responseText = await response.text();

      const responseObject = await JSON.parse(responseText);



      this.products = responseObject;

      this.$router.push('/dashboard');

    } catch (error) {
      console.log(error);
    }
  }

})
</script>


<template>
  <header>
    <div id="profile">
      <GenderIconCase></GenderIconCase>
      <h1 v-if="user">{{user.username}}</h1>

    </div>
      <nav>
      <ul>
        <li>
          <a @click.prevent="doLogout()">
              Logout
          </a>
        </li>
      </ul>

    </nav>
  </header>

  <main>
    <h1>Cadastro de Produtos</h1>

    <router-link to="/create-product" id="create-product">
      Cadastrar Produto
  </router-link>

    <table>
    <thead>
    <tr>
      <th>Nome</th>
      <th>Descrição</th>
      <th>Preço</th>
      <th>Quantidade</th>
      <th>Ações</th>
    </tr>
    </thead>
    <tbody>
        <tr v-for="product in this.products" :key="product.id">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>R$ {{product.price}},00</td>
            <td>{{product.quantity}}</td>
            <td>
              <router-link class="crud-button update" :to="'/update-product/' + product.id">Atualizar Produto</router-link>
              <router-link class="crud-button delete" :to="'/delete-product/' + product.id" @click.prevent="deleteProduct(product.id)">Remover Produto</router-link>
            </td>
        </tr>
    </tbody>
  </table>
  </main>
</template>

<style scoped>
 .dashboard-page header {
  background-color: #282c34;
  color: #ffffff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

 .dashboard-page header h1 {
  margin: 0;
  font-size: 24px;
}
 .dashboard-page #profile {
   display: flex;
   align-items: center;
   gap: 8px;
 }

 .dashboard-page nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

 .dashboard-page nav ul li {
  margin-left: 20px;
}

 .dashboard-page nav a {
  color: white;
  font-size: 16px;
  text-decoration: none;
   cursor: pointer;
}


 .dashboard-page nav a:hover {
  text-decoration: underline;
   font-weight: bolder;
}

 .dashboard-page main {
   padding: 10px;
 }

 .dashboard-page table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

 .dashboard-page table td,
 .dashboard-page table th {
   padding: 12px;
   border: 1px solid #ddd;
   text-align: center;
   width: 20%;
 }



 .dashboard-page table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

 .dashboard-page table tr:nth-child(even) {
  background-color: #f9f9f9;
}

 .dashboard-page th {
  font-size: 14px;
}

 .dashboard-page td {
  font-size: 12px;
}

 .dashboard-page h1 {
  font-size: 28px;
  margin: 20px 0;
  text-align: center;
}

  #create-product {
    display: inline-block;
    color: white;
    background-color: royalblue;
    font-weight: bold;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    margin-left: 10px;
  }

  #create-product:hover {
    background-color: #7894e3;
  }

  .crud-button {
    display: inline-block;
    color: white;
    font-weight: bold;
    padding: 8px;
    font-size: 13px;
    border-radius: 4px;
    margin: 5px 5px;
  }

  .update {

    background-color: #5bc762;

  }

  .delete {
    background-color: #f56666;

  }

  .update:hover {
    font-weight: 700;
    background-color: #6fe88b;
  }

  .delete:hover {
    font-weight: 700;
    background-color: #ef8383;
  }

</style>
