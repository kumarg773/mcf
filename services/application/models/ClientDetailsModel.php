<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/* @author         Akshatha */
class ClientDetailsModel extends CI_model
{

	protected $clientFields = [
		"Client_Id",
		"Client_Name",
		"Business_Name",
		"Address",
		"Email_Address",
		"Website",
		"Country_Id",
		"State_Id",
		"City",
		"Zip_Code",
		"Industry",
		"Currency",
		"Timezone",
		"Created_Timestamp",
		"Db_Password",
		"Db_Hostid",
		"Active_State",
		"Updated_Timestamp",
		"Server_Path",
		"Instance_Status",
		"Log_Method",
		"Partner_Id",
		"Sent_Email_State",
		"Client_Remote_Address",
		"Version"
	];
	protected $clientAdminFields = [
        "Admin_Name",
		"Designation",
		"Contact_Number",
		"Admin_Alternate_Contact_Number",
		"Admin_Email_Address",
		"Admin_Alternate_Email_Address",
		"Client_Id"
	];
	protected $clientProductFields = [
		"Product_Id",
		"Varient_Id",
		"Client_Id",
		"Subscription_Count",
		"Licenses",
		"Pricing",
		"Discount",
		"Total_Discount",
		"Discount_End_Date",
		"Discount_Extended_Date",
		"Payment_Schedule",
		"Bill_Date",
		"Net_Amount",
		"Tenure_End_Date",
		"Active_Status",
		"Extended_License"
	];
	protected $clientInventoryFields = [
        "Billing_Person_Name",
		"Client_Designation",
		"Client_Mobile_Number",
		"Client_Alternate_Number",
		"Client_Email_Address",
		"Card_Type",
		"Card_Holder_Name",
		"Card_Number",
		"Expiry_Month",
		"Expiry_Year",
		"Bank_Name",
		"Account_Number",
		"Ifsc_Code",
		"Client_Country",
		"Swift_Code",
		"Branch_Address",
		"Client_Id",
		"Remarks"
	];

	protected $countryFields = [
        "Country_Id",
        "Country_Name"
	];

	protected $stateFields = [
        "State_Id",
        "State_Name",
        "Country_Id"
	];

	function __construct()
	{
		parent::__construct();
	}
	public function fetch_all_client()
	{
		$query = $this->db->get('tm_client_details');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function fetch_all_productmap($id)
	{
		$query = $this->db->select('tb_product_map.*')
            ->from('tb_product_map')
            ->join('tm_client_details', 'tm_client_details.Id = tb_product_map.Client_Id', 'left')
            ->where("tm_client_details.Id='$id'")
            ->get();
        return $query->result();
	}

	public function fetch_all_admin($id)
	{
		$query = $this->db->select('tb_client_admin_details.*')
            ->from('tb_client_admin_details')
            ->join('tm_client_details', 'tm_client_details.Id = tb_client_admin_details.Client_Id', 'left')
            ->where("tm_client_details.Id='$id'")
            ->get();
        return $query->result();
	}

	public function fetch_all_inventory($id)
	{
		$query = $this->db->select('tb_client_inventory_details.*')
            ->from('tb_client_inventory_details')
            ->join('tm_client_details', 'tm_client_details.Id = tb_client_inventory_details.Client_Id', 'left')
            ->where("tm_client_details.Id='$id'")
            ->get();
        return $query->result();
	}

	public function fetchProductDetals($id)
    {
        $query = $this->db->select('tm_product_master.*')
            ->from('tm_product_master')
            ->join('tb_product_map', 'tb_product_map.Product_Id = tm_product_master.Id', 'left')
            ->where("tb_product_map.Id='$id'")
            ->get();
        return $query->result();
    }

    public function fetchProductVarientDetals($id)
    {
        $query = $this->db->select('tb_product_variant.*')
            ->from('tb_product_variant')
            ->join('tb_product_map', 'tb_product_map.Varient_Id = tb_product_variant.Id', 'left')
            ->where("tb_product_map.Id='$id'")
            ->get();
        return $query->result();
    }

    public function fetchCountryDetals($id)
    {
        $query = $this->db->select('tm_country.*')
            ->from('tm_country')
            ->join('tm_client_details', 'tm_client_details.Country_Id = tm_country.Id', 'left')
            ->where("tm_client_details.Id='$id'")
            ->get();
        return $query->result();
    }

    public function fetchStateDetals($id)
    {
        $query = $this->db->select('tb_state.*')
            ->from('tb_state')
            ->join('tm_client_details', 'tm_client_details.State_Id = tb_state.Id', 'left')
            ->where("tm_client_details.Id='$id'")
            ->get();
        return $query->result();
    }

    public function fetch_all_country()
	{
		$query = $this->db->get('tm_country');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function fetch_all_state()
	{
		$query = $this->db->get('tb_state');
		if($query->num_rows() > 0 )
		{
			return $query->result();
		}
	}

	public function addClients($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->clientFields)) {
                $values[$key] = $value;
            }
        }
        $admin = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->clientAdminFields)) {
                $admin[$key] = $value;
            }
        }
        $product = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->clientProductFields)) {
                $product[$key] = $value;
            }
        }
        $inventory = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->clientInventoryFields)) {
                $inventory[$key] = $value;
            }
        }

		$this->db->insert('tm_client_details', $values);
		$client = $this->db->insert_id();
		$admin['Client_Id'] = $client;
		$this->db->insert('tb_client_admin_details', $admin);
		$product['Client_Id'] = $client;
		$this->db->insert('tb_product_map', $product);
		$inventory['Client_Id'] = $client;
		$this->db->insert('tb_client_inventory_details', $inventory);
		return $client;
	}

	public function updateClient($data)
	{
		$values = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->clientFields)) {
                $values[$key] = $value;
            }
        }
        $admin = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->clientAdminFields)) {
                $admin[$key] = $value;
            }
        }
        $product = array();
        foreach ($data as $key => $value) {
            if (in_array($key, $this->clientProductFields)) {
                $product[$key] = $value;
            }
        }
        $inventory = array();
        foreach ($data["Inventory"][0] as $key => $value) {
            if (in_array($key, $this->clientInventoryFields)) {
                $inventory[$key] = $value;
            }
        }

		$this->db->where('Id', $data["Id"]);
        $this->db->update('tm_client_details', $values);
        $client_Id = $data["Id"];
        $admin['Client_Id'] = $client_Id;
        $this->db->where('Id', $data["adminDetails"][0]["Id"]);
        $this->db->update('tb_client_admin_details', $admin);
        $product['Client_Id'] = $client_Id;
		$this->db->where('Id', $data["productMap"][0]["Id"]);
        $this->db->update('tb_product_map', $product);
        $inventory['Client_Id'] = $client_Id;
		$this->db->where('Id', $data["Inventory"][0]["Id"]);
        $this->db->update('tb_client_inventory_details', $inventory);
	}
}
?>
