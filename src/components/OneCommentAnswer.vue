<template>
  <div class="one-comment-answer">
    <div class="onecom">
      <div
        class="onecom__left left"
        @click.stop="showParameters"
      >
        <div class="left__avatar">
          <div
            :style="{'background-image': `url(${ answer.author.avatar })`}"
            class="avatar">
            {{ answer.author.avatar === '' ? answer.author.avatar =
            'https://kiittnp.in/ea19b38134d463acc8c7b66744a481847ab4b/assets/img/user.png' : '' }}
          </div>
        </div>
        <div class="left__userbox userbox">
          <div class="userbox__comment comment">
            <div class="comment__username">
              {{ answer.author.username }}
              <span class="conjunction">
                <i class="fas fa-long-arrow-alt-right"/>
              </span>
              {{ answer.usernameOfCompanion ?
              answer.usernameOfCompanion : comment.author.username }}
            </div>
            <div class="comment__usercom">
              {{ answer.comment }}
            </div>
          </div>
          <div class="userbox__box-answer_date box-answer_date">
            <div class="box-answer_date__commentdate">
              {{ commentCreateTime }}
            </div>
            <div
              v-if="answer.editing"
              class="box-answer_date__true-edit">
              ● edited
            </div>
          </div>
          <CommentAnswerItems
            v-if="showCommentAnswerItems &&
            !awesomeOperations.editCom && !awesomeOperations.editAns"
            :comment="comment"
            :answer="answer"
            :post="post"
          />
        </div>
      </div>
      <div class="onecom__right right">
        <div class="right__like like">
          <div
            v-if="answer.likes.length"
            class="like__count"
          >
            {{ answer.likes.length }}
          </div>
          <div
            class="like__position"
            @click="switchLikeComment">
            <i
              v-if="!answer.likes.some(u => u.id === user.id)"
              class="far fa-heart"
            />
            <i
              v-if="answer.likes.some(u => u.id === user.id)"
              class="fas fa-heart"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import CommentAnswerItems from './CommentAnswerItems';

export default {
  name: 'OneCommentAnswer',
  components: {
    CommentAnswerItems,
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    comment: {
      type: Object,
      default: () => {},
    },
    answer: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selfcomment: {
        usernameOfCompanion: 'mark',
      },
      showCommentAnswerItems: false,
      likePos: false,
    };
  },
  computed: {
    commentCreateTime() {
      return moment(this.answer.createDate).fromNow(true);
    },
    ...mapGetters([
      'posts',
      'user',
      'awesomeOperations',
    ]),
  },
  mounted() {
    window.addEventListener('click', this.closeCommentAnswerParameters);
  },
  destroed() {
    window.removeEventListener('click', this.closeCommentAnswerParameters);
  },
  methods: {
    closeCommentAnswerParameters() {
      this.showCommentAnswerItems = false;
    },
    switchLikeComment() {
      // this.answer.id = Math.floor(Math.random() * 10000);
      // this.likePos = !this.likePos;
      if (this.answer.likes.findIndex(u => u.id === this.user.id) !== -1) {
        this.$store.dispatch('dislikeAnswer', {
          postId: this.post.id,
          commentId: this.comment.id,
          answerId: this.answer.id,
          user: this.user,
        });
      } else {
        this.$store.dispatch('likeAnswer', {
          postId: this.post.id,
          commentId: this.comment.id,
          answerId: this.answer.id,
          user: this.user,
        });
      }
    },
    likeComment() {

    },
    showParameters() {
      this.showCommentAnswerItems = !this.showCommentAnswerItems;
    },
  },
};
</script>

<style
   lang="stylus"
   scoped>
  .comment-answers
      cursor pointer
  .onecom
      display flex
      margin-bottom 5px
  .onecom__left
      display flex
  .left__avatar
      align-self flex-start
      padding 5px
  .avatar
      background center center/cover no-repeat grey
      height 27px
      width 27px
      border-radius 50%
      padding 2px
  .left__userbox
      display flex
      flex-direction column
      border-radius 5px
      background-color white
      box-shadow 0 1px 2px 0 rgba(0 0 0 0.6)
  .left__userbox:active
      background-color #ebebeb
  .userbox__comment
      font-family "Arial", Arial, sans-serif
      align-self stretch
      flex-shrink 0
      display flex
      flex-direction column
      border-radius 5px
      padding 5px 8px 5px 8px
      max-width 218px
  .comment__username
      letter-spacing -0.2px
      font-size 15px
      align-self flex-start
      font-weight 600
  .conjunction
      font-weight normal
      font-style italic
  .comment__usercom
      font-family "Arial", Arial, sans-serif
      color rgb(0 0 0)
      font-size 15px
      line-height 15px
      letter-spacing -0.2px
      word-wrap break-word
  .userbox__box-answer_date
      font-family "Arial", Arial, sans-serif
      letter-spacing -0.2px
      justify-content center
      display flex
      font-size 12px
      padding 0 3px 2px 3px
  .box-answer_date__commentdate
      color #636363
      padding-bottom 1px
      -webkit-touch-callout none
      -webkit-user-select none
      -khtml-user-select none
      -moz-user-select none
      -ms-user-select none
      user-select none
  .box-answer_date__true-edit
      margin 0 0 0 5px
  .onecom__right
      margin 0 5px 0 3px
      display flex
      align-items center
      -webkit-touch-callout none
      -webkit-user-select none
      -khtml-user-select none
      -moz-user-select none
      -ms-user-select none
      user-select none
  .right__like
      display flex
      color rgb(162 55 243)
      align-items center
      font-family "Arial", Arial, sans-serif
      letter-spacing -0.2px
      font-size 13px
  .like__position
      padding 0 3px 0 3px
</style>
