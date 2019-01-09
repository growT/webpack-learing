<template>
    <div class="hello-word">
        {{msg}}
    </div>
</template>
<script>
import hello from '../static/js/hello.js'
    export default {
        name: 'hello-word',
        data() {
            return {
                msg: 'hello world',
            }
        },
        created() {
            console.log('created hello world');
            console.log('-----------------------------');
            hello();
        }
    }
</script>
<style>
    body {
        display: flex;
        justify-content: center;
    }
    .hello-word {
        font-size: 16px;
        color: bule;
    }
</style>


