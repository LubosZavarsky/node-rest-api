document.addEventListener("alpine:init", () => {
  // GLOBAL STORE
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
  // AUTH FORMS
  Alpine.data("authFormData", () => ({
    username: "",
    email: "",
    password: "",
    login() {
      try {
        fetch(`http://localhost:8000/api/users/login`, {
          // !! only in dev env, change to /api/songs in prod !!
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
              this.formReset();
              Swal.fire({
                text: "User logged in: " + Alpine.store("storeData").user.name,
                background: "#ffe4c4",
                position: "bottom-end",
                timer: 1500,
                showConfirmButton: false,
                toast: true,
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    register() {
      if (this.validateRegister()) {
        try {
          fetch(`http://localhost:8000/api/users/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: this.username,
              email: this.email,
              password: this.password,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message) {
                Swal.fire(data.message);
              } else {
                Alpine.store("storeData").currentTab = "login";
                this.formReset();
                Swal.fire({
                  text: "User successfully registered, please log in!",
                  background: "#ffe4c4",
                  position: "bottom-end",
                  timer: 1500,
                  showConfirmButton: false,
                  toast: true,
                });
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    },
    formReset() {
      this.username = "";
      this.email = "";
      this.password = "";
    },
    validateRegister() {
      if (
        !this.isEmail(this.email) ||
        !this.username.trim().length ||
        this.password.length < 3
      ) {
        Swal.fire("Please enter valid credentials");
        return;
      } else return true;
    },
    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
  })),
    // SONGS CRUD
    Alpine.data("songsData", () => ({
      id: "",
      title: "",
      author: "",
      isLoading: false,
      isEditing: false,
      songs: null,
      fetchSongs() {
        this.isLoading = true;
        fetch(`http://localhost:8000/api/songs/`)
          .then((res) => res.json())
          .then((data) => {
            this.isLoading = false;
            this.songs = data;
          });
      },
      createSong() {
        try {
          fetch(`http://localhost:8000/api/songs`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Alpine.store("storeData").user.token}`,
            },
            body: JSON.stringify({
              name: this.title,
              author: this.author,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message) {
                Swal.fire(data.message);
              } else {
                this.formReset();
                this.fetchSongs();
                Swal.fire({
                  text: "Song successfully uploaded!",
                  background: "#ffe4c4",
                  position: "bottom-end",
                  timer: 1500,
                  showConfirmButton: false,
                  toast: true,
                });
              }
            });
        } catch (error) {
          console.log(error);
        }
      },
      editSong(song) {
        this.isEditing = true;
        this.title = song.name;
        this.author = song.author;
        this.id = song._id;
      },
      updateSong() {
        try {
          fetch(`http://localhost:8000/api/songs/${this.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Alpine.store("storeData").user.token}`,
            },
            body: JSON.stringify({
              id: this.id,
              name: this.title,
              author: this.author,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message) {
                Swal.fire(data.message);
              } else {
                this.formReset();
                this.fetchSongs();
                Swal.fire({
                  text: "Song successfully updated!",
                  background: "#ffe4c4",
                  position: "bottom-end",
                  timer: 1500,
                  showConfirmButton: false,
                  toast: true,
                });
              }
            });
        } catch (error) {
          console.log(error);
        }
      },

      deleteSong(id) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:8000/api/songs/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${Alpine.store("storeData").user.token}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message) {
                  Swal.fire(data.message);
                } else {
                  Swal.fire("Deleted!", "Song has been deleted.", "success");
                  this.fetchSongs();
                }
              });
          }
        });
      },
      formReset() {
        this.id = "";
        this.title = "";
        this.author = "";
        this.isEditing = false;
      },
    }));
});
