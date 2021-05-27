<template>
  <div class='shipping-addr' :address="address">
    <section>
      <p><strong>{{ address.name }}</strong></p>
      <p><i>{{ address.company }}</i></p>
      <p><i>{{ address.formattedArea }}</i></p>
      <p><i>{{ address.phone }}</i></p>
      <p><i>{{ address.email }}</i></p>
    </section>
  </div>
</template>

<script type="module">
export default {
  name: 'UserShippingAddress',
  props: {
    address: {
      default: {},
      type: Object
    }
  }
};
</script>
