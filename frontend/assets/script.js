document.addEventListener("alpine:init", () => {
  Alpine.store("storeData", {
    init() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    user: null,
    currentTab: "login",
    logout() {
      localStorage.removeItem("user");
      this.user = null;
    },
  });
  Alpine.data("formData", () => ({
    username: "",
    email: "",
    password: "",
    login() {
      try {
        fetch(`http://localhost:8000/api/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire(data.message);
            } else {
              localStorage.setItem("user", JSON.stringify(data));
              Alpine.store("storeData").user = JSON.parse(
                localStorage.getItem("user")
              );
              Swal.fire({
                text: "User logged in: " + Alpine.store("storeData").user.name,
                position: "top-end",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  })),
    Alpine.data("getSongs", () => ({
      isLoading: false,
      songs: null,
      fetchSong() {
        this.isLoading = true;
        fetch(`http://localhost:8000/api/songs/`) // !! only in dev env, change to /api/songs in prod !!, move to script.js?
          .then((res) => res.json())
          .then((data) => {
            this.isLoading = false;
            this.songs = data;
            console.log(this.songs);
          });
      },
    }));
});
