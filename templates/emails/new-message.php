<div style="min-width: 100vw; min-height: 100vh; background: #f4f5f7; font-family: sans-serif; margin: -5px; padding: 50px 25px; box-sizing: border-box;">

    <div style="min-height: 80vh; max-width: 700px; margin: auto; background: #fff; border-radius: 3px; box-shadow: 0 1px 2px rgba(0, 0, 0, .4); padding: 25px;">

        <h1 style="margin: 5px;">New Message</h1>

        <p style="margin: 5px;">You have a new message.  The details are below:</p>

        <div style="margin-top: 25px;">

            <?php foreach ($fcf as $key => $_value) : ?>

                <div>

                    <p style="margin: 5px;"><strong><?php echo $key; ?>: </strong><?php echo $_value; ?></p>

                </div>

            <?php endforeach; ?>

        </div>

    </div>

</div>