const Book = require('../models/booksModel');

 function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

exports.checkExistance = async function (req, res, next) {
    let name = req.body.name.toLowerCase();
    try {
        if (!name) {
            return res.status(400).json({ status: 400, message: 'lack of body informations' })
        } else {
            let data = await Book.findOne({ name: name });
            if (data) {
                return res.status(200).json({ status: 200, message: 'book already exists', data: { exist: true } })
            } else {
                return res.status(200).json({ status: 200, message: 'book do not exist', data: { exist: false } })
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' });
    }
};


exports.create = async function (req, res, next) {
    /*
    * body:{
    *      name: string
    *      pages: string
    *      author: author _id as a string
    *      price number
    *      image: not required file
    * }
    */

    let body = req.body;
    if (!body.name || !body.pages || !body.price || !body.author) {
        return res.status(400).json({ status: 400, message: 'lack of body informations' })
    } else {
        if (req.file)
            body['image'] = req.file.filename;
        else
            body['image'] = 'book_default_image.png';

        try {
            const new_book = new Book(body);
            const book_data = await (await Book.create(new_book)).populate('author');
            if (book_data) {
                return res.status(201).json({
                    status: 201,
                    message: 'new book ctreated',
                    data: {
                        _id: book_data._id,
                        name: book_data.name,
                        price: book_data.price,
                        pages: book_data.pages,
                        image: book_data.image,
                        author: {
                            _id: book_data.author._id,
                            fullname: book_data.author.fullname,
                            biography: book_data.author.biography,
                            image: book_data.author.image,
                        }
                    }
                });
            } else
                res.status(409).json({ status: 409, message: 'book is not created' });
        } catch (error) {
            return res.status(500).json({ status: 500, message: 'server error' })
        }
    }
};

exports.list = async function (req, res, next) {
    let page = Number(req.params.page_number)
    let per_page = Number(req.params.per_page)

    try {
        const books = await Book.find({}, '_id author name image pages price')
            .populate('author', '_id fullname biography image')
            .sort({ updatedAt: -1 })
        let count = await Book.countDocuments();

        return res.status(200).json({
            status: 200, message: 'list of books', data: {
                total_count: count,
                current_page: Number(page),
                total_pages: Math.ceil(count / per_page),
                books: paginate(books, per_page, page).map((book) => {
                    return ({
                        _id: book._id,
                        name: book.name,
                        price: book.price,
                        pages: book.pages,
                        image: book.image,
                        author: {
                            _id: book.author._id,
                            fullname: book.author.fullname,
                            biography: book.author.biography || "",
                            image: book.author.image,
                        }
                    })
                })
            }
        });

    } catch (error) {
        
        return res.status(500).json({ status: 500, message: 'server error' })
    }
};

exports.details = async function (req, res, next) {
    let _id = req.params._id;
    try {
        let book = await Book.exists({ _id: _id })
        if (book) {

            let book_data = await (await Book.findById(_id))
                .populate('author', '_id fullname image biography')

            return res.status(200).json({
                status: 200,
                message: 'book found',
                data: {
                    _id: book_data._id,
                    name: book_data.name,
                    price: book_data.price,
                    pages: book_data.pages,
                    image: book_data.image,
                    author: {
                        _id: book_data.author._id,
                        fullname: book_data.author.fullname,
                        biography: book_data.author.biography,
                        image: book_data.author.image,
                    }
                }
            });
        } else
            res.status(409).json({ status: 409, message: 'book not found' });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' })
    }
};

exports.update = async function (req, res, next) {

    let _id = req.params._id;
    let body = req.body;

    if (req.file)
        body['image'] = req.file.filename;

    try {
        let book = await Book.exists({ _id: _id })
        if (book) {
            await Book.updateOne({ _id: _id }, body);
            let book_data = await (await Book.findById(_id)).populate('author', '_id fullname image')
            return res.status(200).json({
                status: 200, message: 'book updated', data: {
                    _id: book_data._id,
                    name: book_data.name,
                    price: book_data.price,
                    pages: book_data.pages,
                    image: book_data.image,
                    author: {
                        _id: book_data.author._id,
                        fullname: book_data.author.fullname,
                        image: book_data.author.image,
                    }
                }
            });
        } else
            res.status(409).json({ status: 409, message: 'book not found' });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' })
    }
};

exports.delete = async function (req, res, next) {
    let _id = req.params._id;
    try {
        let book_data = await Book.exists({ _id: _id })
        if (book_data) {
            await Book.deleteOne({ _id: _id })
            return res.status(200).json({
                status: 200,
                message: 'book deleted'

            });
        } else
            res.status(409).json({ status: 409, message: 'book not found' });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'server error' })
    }
};