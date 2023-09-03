<script lang="ts">
	import { i } from "@inlang/sdk-js"
</script>
<form method="POST">
	<hgroup>
		<h2>{i("register")}</h2>
		<h3>{i("accounttopost")}</h3>
	</hgroup>

	<label for="name">{i("name")}</label>
	<input type="text" id="name" name="name" required />

	<label for="username">{i("username")}</label>
	<input type="text" id="username" name="username" required />

	<label for="password">{i("password")}</label>
	<input type="password" id="password" name="password" required />

	<button type="submit">{i("register")}</button>
</form>
<p>{i("alreadyhaveaccount")} <a href="/login">{i("login")}</a></p>
