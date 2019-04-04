var app = new Vue({
  el: '#app',
  data: {
    equation: " ",
    favoritesList: [],
    current: {
      operation: 'derive',
      expression: '',
      result: '',
    },
  },
  created: function() {
    this.getItems();
  },
  computed: {
    computationChoice() {
      return this.current.operation.toUpperCase();
    }
  },
  methods: {
    async getItems() {
      try {
        const response = await axios.get("/api/favoritesList");
        this.favoritesList = response.data;
        console.log(response.data);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async mathSubmit() {
      this.loading = true;
      const response = await axios.get('https://newton.now.sh/' + this.current.operation + '/' + encodeURIComponent(this.equation));
      this.current = response.data;
      this.loading = false;
      await axios.post('/api/favoritesList', response.data);
      this.getItems();
    },
    derivativeCalculator() {
      this.current.operation = "derive";
    },
    simplifyEquation() {
      this.current.operation = "simplify";
    },
    factorEquation() {
      this.current.operation = "factor";
    },
    integrationCalculator() {
      this.current.operation = "integrate";
    },
    findZeroes() {
      this.current.operation = "zeroes";
    },
    sin() {
      this.current.operation = "sin";
    },
    cosine() {
      this.current.operation = "cos";
    },
    tangent() {
      this.current.operation = "tan";
    }
  }
})