const contactController = (req, res) => {
    res.render('./pages/contact',{ title: 'Contact' });
}

const contactPostController = (req, res) => {
    console.log(req.body);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Form Submitted</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        </head>
        <body>
            <div class="container mt-5">
                <div class="alert alert-success text-center" role="alert">
                    Form submitted successfully!
                </div>
            </div>
            <script>
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000); 
            </script>
        </body>
        </html>
    `);
}

export {contactController,contactPostController};