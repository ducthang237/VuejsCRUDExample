<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Add Item</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addItem">
          <div class="form-group">
            <label>Item Name:</label>
            <input type="text" v-model="item.name" id="name" name="name" class="form-control"
                   :class="{ 'is-invalid': submitted && $v.item.name.$error }" />
            <div v-if="submitted && $v.item.name.$error" class="invalid-feedback">
              <span v-if="!$v.item.name.required">Name is required</span>
              <span v-if="!$v.item.name.minLength">Name must be at least 3 characters</span>
            </div>
          </div>
          <div class="form-group">
            <label>Item Price:</label>
            <input type="text" v-model="item.price" id="price" name="price" class="form-control"
                   :class="{ 'is-invalid': submitted && $v.item.price.$error }" />
            <div v-if="submitted && $v.item.price.$error" class="invalid-feedback">
              <span v-if="!$v.item.price.required">Price is required</span>
              <span v-if="!$v.item.price.integer">Price must be an integer</span>
            </div>
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Add Item"/>
            <router-link :to="{name: 'Index'}" class="btn btn-secondary m-2">Back</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength, integer } from 'vuelidate/lib/validators';
  export default {
    name: "app",
    components: {
      name: 'AddItem'
    },
    data() {
      return {
        item: {
          name: '',
          price: 0
        },
        submitted: false
      }
    },
    validations: {
      item: {
        name: {
          required,
          minLength: minLength(3)
        },
        price: {
          required,
          integer
        }
      }
    },
    methods: {
      addItem() {
        this.submitted = true;

        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }

        let uri = 'http://localhost:4000/items/add';
        this.axios.post(uri, this.item).then((response) => {
          console.log('Add item successfully', response.data);
          this.$router.push({name: 'Index'});
        });
      }
    }
  }
</script>
