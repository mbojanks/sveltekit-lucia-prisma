<script lang="ts">
	import { i } from "@inlang/sdk-js"
</script>
<form method="POST">
	<hgroup>
		<h2>{i("login")}</h2>
		<h3>{i("welcomeback")}</h3>
	</hgroup>
	<label for="username">{i("username")}</label>
	<input type="text" id="username" name="username" required />

	<label for="password">{i("password")}</label>
	<input type="password" id="password" name="password" required />

	<button type="submit">{i("login")}</button>
</form>
<p>{i("nothaveaccount")} <a href="/register">{i("register")}</a></p>
