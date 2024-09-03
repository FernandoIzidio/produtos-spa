<script>


export default {
  name: "GenderIconCase",
  computed: {
    getUser(){
      return this.$store.state.user;
    }
  },
  props: {
    size: {
      type: String,
      default: "base",
      required: false
    }
  }
}
</script>

<template>
  <div>
    <div>
      <span v-if="getUser && (getUser.gender === 'MASCULINO' || getUser.gender === 'INTERSEXO')"
           id="profileMan"
           :class="'icon profileIcon ' + size"
      ></span>
      <span v-else
           id="profileWoman"
           :class="'icon profileIcon ' + size"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.icon {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  color: transparent;
  display: inline-block;
}

.profileIcon {
  align-self: center;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 3.6rem;
  height: 3.6rem;
}

#profileMan.base{
  background-image: url("@/assets/profile-man.png");
}

#profileMan.big{
  background-image: url("@/assets/profile-man-big.png");
  width: 10rem !important;
  height: 10rem !important;
}

#profileWoman.base {
  background-image: url("@/assets/profile-woman.png");
}


#profileWoman.big {
  background-image: url("@/assets/profile-woman-big.png");
  width: 10rem !important;
  height: 10rem !important;
}

</style>
