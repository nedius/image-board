export const useQueryStore = defineStore("query", {
    state: () => ({
        hasTags: true,
        tags: "cat",

        rating: "sfw",

        hasScore: true,
        score: 50,

        hasRandom: false,
        random: 6,

        hasLimit: true,
        limit: 10,

        hasAge: false,
        age: 30,
    }),
    actions: {
        doSearch(searchParams) {
            if (searchParams) {
                if ('hasTags' in searchParams) this.hasTags = searchParams.hasTags;
                if ('tags' in searchParams) this.tags = searchParams.tags;
                if ('rating' in searchParams) this.rating = searchParams.rating;
                if ('hasScore' in searchParams) this.hasScore = searchParams.hasScore;
                if ('score' in searchParams) this.score = searchParams.score;
                if ('hasRandom' in searchParams) this.hasRandom = searchParams.hasRandom;
                if ('random' in searchParams) this.random = searchParams.random;
                if ('hasLimit' in searchParams) this.hasLimit = searchParams.hasLimit;
                if ('limit' in searchParams) this.limit = searchParams.limit;
                if ('hasAge' in searchParams) this.hasAge = searchParams.hasAge;
                if ('age' in searchParams) this.age = searchParams.age;
            }
        },
        doClear(reset= false) {
            if (reset) {
                this.hasTags = true;
                this.tags = "cat";
                this.rating = "sfw";
                this.hasScore = true;
                this.score = 50;
                this.hasRandom = false;
                this.random = 6;
                this.hasLimit = true;
                this.limit = 10;
                this.hasAge = false;
                this.age = 30;
            }
        }
    },
    getters: {
        getString: (state) => {
            const query = new URLSearchParams();
            if (state.hasTags) query.append("tags", state.tags);
            if (state.rating !== 'none') query.append("rating", state.rating);
            if (state.hasScore) query.append("score", state.score);
            if (state.hasRandom) query.append("random", state.random);
            if (state.hasLimit) query.append("limit", state.limit);
            if (state.hasAge) query.append("age", state.age);
            return query.toString().replaceAll('+', '%20');
        }
    },
    persist: true,
});