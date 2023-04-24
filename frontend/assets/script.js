document.addEventListener("alpine:init", () => {
  //Alpine.store("storeData", {}); move controlData to store ?!
  Alpine.data("controlData", () => ({
    currentTab: "login",
    currentUser: null,
    username: "",
    email: "",
    password: "",
    login() {
      // WORKING! add try/catch, validation, save token in localStorage, normalize state (currentUser as obj?, form field as obj?)
      console.log(this.email, this.password);
      fetch(`http://localhost:8000/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: this.email, password: this.password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data), (this.currentUser = data.name);
        });
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
      trySong() {
        this.isLoading = true;
        fetch(`http://localhost:8000/api/songs/`, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => {
            this.isLoading = false;
            console.log(data);
          });
      },
    }));
});
