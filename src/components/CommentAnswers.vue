<template>
  <div class="comment_answers">
    <!--<div class="free-place"/>-->
    <div
      v-if="openAnswersList && answers.length"
      class="close_all_comment-ans"
    >
      <i
        class="fas fa-angle-double-up"
        @click="closeAllAnswers"
      />
    </div>
    <div
      v-for="(answer, index) in answers"
      v-if="index < countans && openAnswersList"
      :key="index"
      class="showans">
      <OneCommentAnswer
        :answer="answer"
        :post="post"
        :comment="comment"
        class="comment_one-answer"
      />
    </div>
    <div class="box_switch-add">
      <div
        v-if="answers.length && openAnswersList"
        class="switch-commentanswers"
        @click="closeAllAnswers">
        <span class="anscomment-text">
          Hide
          {{ countans }}
          {{ answers.length === 1 ? "answer" : "answers" }}
        </span>
      </div>
      <div
        v-if="answers.length && !openAnswersList"
        class="switch-commentanswers"
        @click="showAnswers">
        <span class="anscomment-text">
          Show
          {{ 10 > answers.length && countans !== answers.length ? answers.length : countans }}
          {{ answers.length === 1 ? "answer" : "answers" }}
        </span>
      </div>
      <div
        v-if="openAnswersList && countans > 9 && answers.length > 10 && countans < answers.length "
        class="show-more-ans"
        @click="showMoreAns">
        Show more
        {{ countans + 10 > answers.length ? answers.length % 10 : 10 }}
        answers
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OneCommentAnswer from './OneCommentAnswer';

export default {
  name: 'CommentAnswers',
  components: {
    OneCommentAnswer,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    answers: {
      type: Array,
      default: () => [],
    },
    comment: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openAnswersList: false,
      countans: 10,
    };
  },
  computed: {
    ...mapGetters([
      'posts',
    ]),
  },
  mounted() {
    window.addEventListener('click', this.nothing);
  },
  destroed() {
    window.removeEventListener('click', this.nothing);
  },
  methods: {
    nothing() {},
    closeAllAnswers() {
      this.openAnswersList = false;
      this.countans = 10;
    },
    showAnswers() {
      this.openAnswersList = !this.openAnswersList;
    },
    showMoreAns() {
      if (this.countans + 10 < this.answers.length) {
        this.countans += 10;
      } else this.countans += this.answers.length % 10;
    },
  },
};
</script>

<style scoped
        lang="stylus"
>
    .comment_answers
        display flex
        flex-direction column
    .comment_one-answer
        border-left 4px solid #c8c8d1
        margin-left 42px
    .box_switch-add
        margin 0 0 5px 0
        display flex
        -webkit-touch-callout none
        -webkit-user-select none
        -khtml-user-select none
        -moz-user-select none
        -ms-user-select none
        user-select none
    .switch-commentanswers
        cursor pointer
        margin 2px 0 0 0
    .show-more-ans
        font-family "Arial", Arial, sans-serif
        cursor pointer
        margin 0 0 5px 1px
        font-size 11px
        color #747474
        background-color #f2f2f2
        padding 5px
    .anscomment-text
        font-family "Arial", Arial, sans-serif
        font-size 11px
        color #747474
        background-color #f2f2f2
        padding 5px
        margin 0 0 10px 40px
        border-radius 0 0 0 7px
    .close_all_comment-ans
        display flex
        justify-content center
    .fa-angle-double-up
        color #b3b3b3
        margin 1px
        cursor pointer
    .fa-angle-double-up:hover
        color grey
        margin 1px
        cursor pointer
        -webkit-transform scale(1.4)
        -moz-transform scale(1.4)
        -o-transform scale(1.4)
</style>
