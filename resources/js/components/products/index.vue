<script setup>
import axios from 'axios';
import { Bundle } from 'magic-string';
import { Swal } from 'sweetalert2/dist/sweetalert2';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

let products = ref([])

const router = useRouter()

onMounted(async () => {
  getProducts()
})

const getProducts = async () => {
  let response = await axios.get("/api/get_all_product")
  products.value = response.data.products
  console.log(products, products.value)
}

const newProduct = () => {
  router.push('/product/new')
}

const productPhoto = () => {
  return "upload/"
}

const onEdit = (id) => {
  router.push("/product/edit/" + id)
}

const deleteProduct = (id) => {
  toast.fire({
    title: 'Are you sure?',
    text: "You can't go back",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#5085d6",
    confirmButtonText: "Yes, delete it!"
  }).then( result => {
    if (result.value)
      axios.get('/api/delete_product/' + id)
        .then( response => {
          toast.fire('Delete', 'Product deleted successfully!', 'success')
          getProducts()
        })
        .catch( error => {
          Swal.fire('Failed', 'Product not deleted!', 'warning')
        })
  })
}

</script>

<template>
  <div class="container">
      
      <div class="products__list table  my-3">        
          <div class="customers__titlebar dflex justify-content-between align-items-center">
              <div class="customers__titlebar--item">
                  <h1 class="my-1">Products</h1>
              </div>
              <div class="customers__titlebar--item">
                  <button class="btn btn-secondary my-1" @click="newProduct">
                      Add Product
                  </button>
              </div>
          </div>
  
          <div class="table--heading mt-2 products__list__heading " style="padding-top: 20px;background:#FFF">
              <p class="table--heading--col1">
                Image
              </p>
              <p class="table--heading--col2">
                Product
              </p>
              <p class="table--heading--col4">
                Type</p>
              <p class="table--heading--col3">
                Inventory
              </p>
              <p class="table--heading--col5">
                Actions
              </p>
          </div>
  
          <!-- product 1 -->
          <div v-if="products.length > 0">
            <div class="table--items products__list__item" v-for="item in products" :key="item.id">

                <div class="products__list__item--imgWrapper">
                    <img class="products__list__item--img" :src='productPhoto() + item.photo' style="height: 40px;">
                </div>

                <p class="table--items--col2">
                  {{ item.name }}
                </p>
                <p class="table--items--col2">
                  {{ item.type }}
                </p>
                <p class="table--items--col3">
                  {{ item.quantity }}
                </p>     
                <div>     
                  <button class="btn btn-success" @click="onEdit(item.id)">
                    Edit
                  </button>
                  <button class="btn btn-danger" @click="deleteProduct(item.id)">
                    Remove
                  </button>
                </div>
            </div>
          </div>

          <div v-else> 
              <p>No products to show.</p>
          </div>
          
      </div>
  </div>
</template>