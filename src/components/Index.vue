<template>
  <div>
    <h1>Items</h1>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <td>ID</td>
            <td>Item Name</td>
            <td>Item Price</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pageOfItems" :key="item._id">
            <td>{{ item._id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <router-link :to="{name: 'Edit', params: { id: item._id }}" class="btn btn-primary">Edit</router-link>
            </td>
            <td>
              <button class="btn btn-danger" v-on:click="deleteItem(item._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer pb-0 pt-3">
      <jw-pagination :items="items" :pageSize="pageSize" @changePage="onChangePage" ></jw-pagination>
    </div>
  </div>
</template>

<script>
  const customStyles = {
    li: {
      display: 'inline-block',
    },
    a: {
      color: 'blue'
    }
  };

  export default {
    components: {

    },

    data() {
      return {
        items: [],
        pageOfItems: [],
        customStyles,
        pageSize: 5
      }
    },

    created: function () {
      this.fetchItems();
    },

    methods: {
      fetchItems() {
        let uri = 'http://localhost:4000/items';
        this.axios.get(uri).then((response) => {
          this.items = response.data;
        });
      },
      deleteItem(id) {
        let uri = 'http://localhost:4000/items/delete/' + id;
        this.items = this.items.filter(e => {
          var item = JSON.parse(JSON.stringify(e));
          return item._id !== id;
        });
        this.axios.delete(uri);
      },
      onChangePage(pageOfItems) {
        // update page of items
        console.log('pageOfItems = ',pageOfItems);
        this.pageOfItems = pageOfItems;
      }
    }
  }
</script>
