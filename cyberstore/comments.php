<?php
if ( post_password_required() ) {
	return;
}

if ( comments_open() || get_comments_number() ) { ?>
	<div class="mkd-comment-holder clearfix" id="comments">
		<?php if ( have_comments() ) { ?>
			<div class="mkd-comment-holder-inner">
				<div class="mkd-comments-title">
					<h4><?php esc_html_e( 'Comments', 'cyberstore' ); ?></h4>
				</div>
				<div class="mkd-comments">
					<ul class="mkd-comment-list">
						<?php wp_list_comments( array_unique( array_merge( array( 'callback' => 'cyberstore_mikado_comment' ), apply_filters( 'cyberstore_mikado_comments_callback', array() ) ) ) ); ?>
					</ul>
				</div>
			</div>
		<?php } ?>
		<?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) { ?>
			<p><?php esc_html_e( 'Sorry, the comment form is closed at this time.', 'cyberstore' ); ?></p>
		<?php } ?>
	</div>
	<?php
		$mkd_commenter = wp_get_current_commenter();
		$mkd_req       = get_option( 'require_name_email' );
		$mkd_aria_req  = ( $mkd_req ? " aria-required='true'" : '' );
        $mkd_consent  = empty( $mkd_commenter['comment_author_email'] ) ? '' : ' checked="checked"';
		
		$mkd_args = array(
			'id_form'              => 'commentform',
			'id_submit'            => 'submit_comment',
			'title_reply'          => esc_html__( 'Leave a reply', 'cyberstore' ),
			'title_reply_before'   => '<h3 id="reply-title" class="comment-reply-title">',
			'title_reply_after'    => '</h3>',
			'title_reply_to'       => esc_html__( 'Post a Reply to %s', 'cyberstore' ),
			'cancel_reply_link'    => esc_html__( 'cancel reply', 'cyberstore' ),
			'label_submit'         => esc_html__( 'Post Comment', 'cyberstore' ),
			'comment_field'        => apply_filters( 'cyberstore_mikado_comment_form_textarea_field', '<textarea id="comment" placeholder="' . esc_attr__( 'Your comment', 'cyberstore' ) . '" name="comment" cols="45" rows="6" aria-required="true"></textarea>' ),
			'comment_notes_before' => '',
			'comment_notes_after'  => '',
			'fields'               => apply_filters( 'cyberstore_mikado_comment_form_default_fields', array(
				'author' => '<input id="author" name="author" placeholder="' . esc_attr__( 'Your Name', 'cyberstore' ) . '" type="text" value="' . esc_attr( $mkd_commenter['comment_author'] ) . '"' . $mkd_aria_req . ' />',
				'email'  => '<input id="email" name="email" placeholder="' . esc_attr__( 'Your Email', 'cyberstore' ) . '" type="text" value="' . esc_attr( $mkd_commenter['comment_author_email'] ) . '"' . $mkd_aria_req . ' />',
                'url'    => '<input id="url" name="url" placeholder="' . esc_attr__( 'Website', 'cyberstore' ) . '" type="text" value="' . esc_attr( $mkd_commenter['comment_author_url'] ) . '" size="30" maxlength="200" />',
                'cookies' => '<p class="comment-form-cookies-consent"><input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes"' . $mkd_consent . ' />' .
                    '<label for="wp-comment-cookies-consent">' . esc_html__( 'Save my name, email, and website in this browser for the next time I comment.', 'cyberstore' ) . '</label></p>'
			) )
		);
		
	if ( get_comment_pages_count() > 1 ) { ?>
		<div class="mkd-comment-pager">
			<p><?php paginate_comments_links(); ?></p>
		</div>
	<?php } ?>

    <?php
    $mkd_show_comment_form = apply_filters('cyberstore_mikado_show_comment_form_filter', true);
    if($mkd_show_comment_form) {
    ?>
        <div class="mkd-comment-form">
            <div class="mkd-comment-form-inner">
                <?php comment_form( $mkd_args ); ?>
            </div>
        </div>
    <?php } ?>
<?php } ?>	