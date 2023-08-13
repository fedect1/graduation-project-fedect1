<script>
export default {
  name: 'TheNavbar'
}
</script>
<template>
  <h1>Sign Up</h1>
  <div class="card">
    <div class="image">
      <img src="ruta_de_la_imagen.jpg" alt="Imagen" />
    </div>
    <div class="form-container">
      <form>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="form-group">
          <button type="submit">Ingresar</button>
        </div>
      </form>
    </div>
  </div>
</template>
