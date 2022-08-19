<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH . 'libraries/REST_Controller.php';
/* @author         Akshatha */
class Partners extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('PartnerModel','partner'); //load model
		$this->load->library('unit_test'); // load unit library
    }
    function Partner_get()
    {
        $id = $this->get('id');
        $partner = $this->partner->fetch_all_partner(); // fetching all the data of the country
        if ($partner) {
            foreach ($partner as $part) {
                $part->partnerProduct = $this->partner->fetch_all_commission($part->Id);
                $part->partnerContact = $this->partner->fetch_all_contact($part->Id);
                $part->partnerInventory = $this->partner->fetch_all_inventory($part->Id);
            }
        }
        if ($id === NULL)
        {
            if ($partner)
            {
                $this->response($partner, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
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

        $partner_data = NULL;
        if (!empty($partner))
        {
            foreach ($partner as $key => $value)
            {
                if (isset($value['Id']) && $value['id'] === $id)
                {
                    $partner_data = $value;
                }
            }
            $this->set_response($partner_data, REST_Controller::HTTP_OK); // OK (200) being the HTTP response code
        }
        else
        {
            $this->set_response([
                'status' => FALSE,
                'message' => 'Partner Details could not be found'
            ], REST_Controller::HTTP_NO_CONTENT); // NOT_FOUND (404) being the HTTP response code
        }


    }

    public function Partner_post()
    {
        $data = $this->post();
        // $insert=1;
        if (isset($data['Id'])) {
            $insert = $this->partner->updatePartner($data);
        } else {
            $insert = $this->partner->addPartner($data);
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