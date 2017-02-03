<?php

    /*
     *  Plugin Name: Floating Contact Form
     *  Description: Add a floating contact form to your website
     *  Version: 0.0.1
     *  Author: Lance Jernigan
     *  Author URI: http://www.lancejernigan.com
     */

    function fcf_init() {

        if (! is_admin()) {

            if (isset($_POST['fcf'])) {

                $fcf = $_POST['fcf'];
                $email = get_option('admin_email');
                $subject = 'New Message';

                ob_start();
                include('templates/emails/new-message.php');

                $message = ob_get_clean();

                wp_mail($email, $subject, $message, ['Content-Type: text/html; charset=UTF-8']);

                wp_redirect('/?fcf_submitted=true');

            }

            wp_enqueue_script('fcf', plugin_dir_url(__file__) . 'assets/js/index.js', ['jquery'], false);
            wp_enqueue_style('fcf-style', plugin_dir_url(__file__) . 'assets/css/style.css');

        }

    }

    add_action('init', 'fcf_init');