<script setup>
  import { onMounted, ref } from 'vue'

  import { useRouter} from 'vue-router'

  const router = useRouter()

  let categories = ref({})
  let selectedCategory = ref()

  let form = ref({
    id: '',
    name: '',
    description: '',
    photo: '',
    category_id: '',
    quantity: '',
    price: '',
  })

  onMounted(async () => {
    await getSingleProduct()
    await getCategories()
    selectedCategory.value = form.value.category_id
  })

  const props = defineProps({
    id: {
      type: String,
      default: ''
    }
  })

  const getCategories = async () => {
    let response = await axios.get(`/api/get_all_category/`)
    categories.value = response.data.categories
  }

  const getSingleProduct = async () => {
    let response = await axios.get(`/api/get_edit_product/${props.id}`)
    form.value = response.data.product
  }

  const getPhoto = () => {
    let photo = "/upload/image.png"
    if (form.value.photo) {
      if (form.value.photo.indexOf('base64') != -1)
        photo = form.value.photo
      else
        photo = '/upload/' + form.value.photo
    }
    console.log("getPhoto: ", form.value.photo)
    return photo
  }
  
  const updatePhoto = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    let limit = 1024 * 1024 * 2
    if (file['size'] > limit)
      return false
    reader.onloadend = (file) => {
      form.value.photo = reader.result
      console.log("onloadend: ", form.value.photo)
    }
    reader.readAsDataURL(file)
  }

  const updateProduct = () => {
    const formData = new FormData()
    formData.append('name', form.value.name) 
    formData.append('description', form.value.description) 
    formData.append('photo', form.value.photo) 
    formData.append('category_id', selectedCategory.value) 
    formData.append('quantity', form.value.quantity) 
    formData.append('price', form.value.price) 

    console.log("formData:", formData)

    axios.post(`/api/update_product/${form.value.id}`, formData)
      .then( response => {
        form.value.name = ''
        form.value.description = '',
        form.value.photo = '',
        form.value.category_id = '',
        form.value.quantity = '',
        form.value.price = '';

        router.push('/')

        toast.fire({
          icon: "success",
          title: "Product updated successfully!",
        })

      })
      .catch( error => {

      })
  }

</script>
<template>
  <div class="container">
    <div class="products__edit ">
       
       <div class="products__create__titlebar dflex justify-content-between align-items-center">
           <div class="products__create__titlebar--item">
               <h1 class="my-1">Edit Product</h1>
           </div>
       </div>

       <div class="products__create__cardWrapper mt-2">
           <div class="products__create__main">
               <div class="products__create__main--addInfo card py-2 px-2 bg-white">
                   <p class="mb-1">Name</p>
                   <input type="text" class="input" v-model="form.name">

                   <p class="my-1">Description (optional)</p>
                   <textarea cols="10" rows="5" class="textarea" v-model="form.description"></textarea>
                   
                   <div class="products__create__main--media--images mt-2">
                       <ul class="products__create__main--media--images--list list-unstyled">
                           
                           <li class="products__create__main--media--images--item">
                               <div class="products__create__main--media--images--item--imgWrapper">
                                   <img class="products__create__main--media--images--item--img" :src="getPhoto()">
                               </div>
                           </li>

                           <!-- upload image small -->
                           <li class="products__create__main--media--images--item">
                               <form class="products__create__main--media--images--item--form">
                                   <label class="products__create__main--media--images--item--form--label" for="myfile">Add Image</label>
                                   <input class="products__create__main--media--images--item--form--input" type="file" id="myfile" @change="updatePhoto">
                               </form>
                           </li>
                       </ul>
                   </div>
                   
               </div>

           </div>
           <div class="products__create__sidebar">
               <!-- Product Organization -->
               <div class="card py-2 px-2 bg-white">
                   
                   <!-- Product unit -->
                   <div class="my-3">
                      <p>Product type</p>
                      <select ref="s" v-model="selectedCategory">
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                          {{ category.name }}
                        </option>
                      </select>
                  </div>
                   <hr>

                   <!-- Product inventory -->
                   <div class="my-3">
                       <p>Inventory</p>
                       <input type="text" class="input" v-model="form.quantity">
                   </div>
                   <hr>

                   <!-- Product Price -->
                   <div class="my-3">
                       <p>Price</p>
                       <input type="text" class="input" v-model="form.price">
                   </div>
               </div>

           </div>
       </div>
       <!-- Footer Bar -->
       <div class="dflex justify-content-between align-items-center my-3">
           <p ></p>
           <button class="btn btn-secondary" @click="updateProduct()">Save</button>
       </div>
   
    </div>
  </div>
</template>
