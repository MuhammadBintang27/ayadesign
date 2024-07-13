import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../../Components/Nav';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
    const location = useLocation();
    const { item } = location.state;

    console.log('Item:', item);
    console.log('Image URL:', item.imageUrl);

    const fields = [];
    for (let i = 1; i <= item.formQuantity; i++) {
        fields.push(
            <div key={i} className="flex flex-wrap mb-6">
                <div className="w-full md:w-1/2 pr-2">
                    <input
                        type="text"
                        id={`nama${i}`}
                        name={`nama${i}`}
                        placeholder={`Nama(${i})`}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="w-full md:w-1/2 pl-2">
                    <input
                        type="text"
                        id={`deskripsi${i}`}
                        name={`deskripsi${i}`}
                        placeholder={`Deskripsi(${i})`}
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mt-6 ml-14 px-4 py-2 ">
                <Link
                    to="/productcatalog"
                    className="inline-block px-3 py-1 border border-black rounded-full text-black font-bold text-lg hover:bg-gray-200 hover:text-gray-700"
                >←
                </Link>
            </div>
            <div className="flex my-4">
                <div className="w-4/12 p-4 mx-4 ml-12 mr-4">
                    <img src={item.imageUrl} alt="Foto" />
                </div>
                <div className="w-3/12 p-4">
                    <h2 className="text-xl font-semibold mb-3">{item.title === "B&W Banner" ? "Design Banner" : "Design Photocard"}</h2>
                    <h3 className="text-lg text-gray-700 mb-2">{item.title === "B&W Banner" ? "Ukuran Banner" : "Ukuran Photocard"}</h3>
                    <p>Panjang: 60 cm</p>
                    <p className="mb-5">Lebar: 160 cm</p>
                    <h3 className="text-lg text-gray-700 mb-2">Detail</h3>
                    <p>Custome judul</p>
                    <p>Custome text</p>
                    <p>Font judul disesuaikan</p>
                    <p>{item.formQuantity ? `Foto untuk ${item.formQuantity} orang` : ""}</p>
                </div>
                <div className="w-5/12 p-4 mx-4 ml-6 mr-12">
                    <h3 className="text-lg text-gray-700 mb-2">Harga Design Banner</h3>
                    <p className="font-semibold">Rp. 35.000</p>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <h2 className="text-lg font-semibold mb-4">Isi Detail Pemesanan</h2>
                <div className="mb-8">
                    <input
                        type="text"
                        id="field1"
                        name="judul"
                        placeholder="Judul Banner"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                {item.formQuantity > 0 && (
                    <>
                        <h3 className="text-md font-semibold mb-4">Detail Nama dan Deskripsi</h3>
                        {fields}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
