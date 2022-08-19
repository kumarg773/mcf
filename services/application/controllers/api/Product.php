<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/* @author         Akshatha */
class Product extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('ProductModel','product'); //load model
		$this->load->library('unit_test'); // load unit library
    }
    function Product_get()
    {
        $id = $this->get('id');
        $product = $this->product->fetch_all_products(); // fetching all the data of the country
        if ($id === NULL)
        {
            if ($product)
            {
                $this->response($product, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No Country found'
                ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
            }
        }

        $id = (int) $id;
        // Validate the id.
        if ($id <= 0)
        {   // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $product_data = NULL;
        if (!empty($product))
        {
            foreach ($product as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $product_data = $value;
                }
            }
            $this->set_response($product_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Products could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }


    function ProductPricing_get()
    {
        $id = $this->get('id');
        $productPrice = $this->product->fetch_all_product_pricing(); // fetching all the data of the country
        if ($productPrice) {
            foreach ($productPrice as $price) {
                $price->Product = $this->product->fetchProductDetals($price->Id);
                $price->Currency = $this->product->fetchProductPricingDetals($price->Id);
                $price->Varient = $this->product->fetchProductVarientDetals($price->Id);
            }
        }
        if ($id === NULL)
        {
            if ($productPrice)
            {
                $this->response($productPrice, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No Country found'
                ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
            }
        }

        $id = (int) $id;
        // Validate the id.
        if ($id <= 0)
        {   // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $productPrice_data = NULL;
        if (!empty($productPrice))
        {
            foreach ($productPrice as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $productPrice_data = $value;
                }
            }
            $this->set_response($productPrice_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Product Pricing could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    function ProductCurrency_get()
    {
        $id = $this->get('id');
        $productCurrency = $this->product->fetch_all_product_currency(); // fetching all the data of the country
        if ($id === NULL)
        {
            if ($productCurrency)
            {
                $this->response($productCurrency, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No Country found'
                ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
            }
        }

        $id = (int) $id;
        // Validate the id.
        if ($id <= 0)
        {   // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $productCurrency_data = NULL;
        if (!empty($productCurrency))
        {
            foreach ($productCurrency as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $productCurrency_data = $value;
                }
            }
            $this->set_response($productCurrency_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Product Currency could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    function ProductVarient_get()
    {
        $id = $this->get('id');
        $productVarient = $this->product->fetch_all_product_varient(); // fetching all the data of the country
        if ($productVarient) {
            foreach ($productVarient as $product) {
                $product->Product = $this->product->fetchProductDetals($product->Id);
            }
        }
        if ($id === NULL)
        {
            if ($productVarient)
            {
                $this->response($productVarient, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
            }
            else
            {
                // Set the response and exit
                $this->response([
                    'status' => FALSE,
                    'message' => 'No Country found'
                ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
            }
        }

        $id = (int) $id;
        // Validate the id.
        if ($id <= 0)
        {   // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        $productVarient_data = NULL;
        if (!empty($productVarient))
        {
            foreach ($productVarient as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $productVarient_data = $value;
                }
            }
            $this->set_response($productVarient_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Product Varient could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    public function Product_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->product->updateProduct($data);
        } else {
            $insert = $this->product->addProducts($data);
        }
        if ($insert == true) {
            $this->set_response($data, REST_Controller::HTTP_CREATED);
            // CREATED (201) being the HTTP response code
        } else {
            $this->response([
                'status' => false,
                'message' => 'data not inserted',
            ], REST_Controller::HTTP_NO_CONTENT);
        }
    }

    public function ProductPricing_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->product->updateProductPricing($data);
        } else {
            $insert = $this->product->addProductPricing($data);
        }
        if ($insert == true) {
            $this->set_response($data, REST_Controller::HTTP_CREATED);
            // CREATED (201) being the HTTP response code
        } else {
            $this->response([
                'status' => false,
                'message' => 'data not inserted',
            ], REST_Controller::HTTP_NO_CONTENT);
        }
    }

    public function ProductCurrency_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->product->updateProductCurrency($data);
        } else {
            $insert = $this->product->addProductCurrency($data);
        }
        if ($insert == true) {
            $this->set_response($data, REST_Controller::HTTP_CREATED);
            // CREATED (201) being the HTTP response code
        } else {
            $this->response([
                'status' => false,
                'message' => 'data not inserted',
            ], REST_Controller::HTTP_NO_CONTENT);
        }
    }

    public function ProductVarient_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->product->updateProductVarient($data);
        } else {
            $insert = $this->product->addProductvarient($data);
        }
        if ($insert == true) {
            $this->set_response($data, REST_Controller::HTTP_CREATED);
            // CREATED (201) being the HTTP response code
        } else {
            $this->response([
                'status' => false,
                'message' => 'data not inserted',
            ], REST_Controller::HTTP_NO_CONTENT);
        }
    }


}



?>