---
title: Data protection and Gravity Forms
date: 2014-05-23
eleventyExcludeFromCollections: true

---
Gravity Forms is a great solution for building all sort of forms within WordPress. Every entry is stored under Forms &#8211;> Entries for easy retrieval. But this means that if the website or server is compromised, then data can be stolen. For one website I manage, I needed a way to get rid of any submitted data from Gravity Forms.

So how to deal with this? Basically, after the entry has been submitted &#8211; which allows for emails to send and others actions to complete, we wipe the relevant database tables, namely `rg_lead_table`, `rg_lead_notes_table`, `rg_lead_detail_table` and `rg_lead_detail_long_table`.

The following code is targeted on the first stored form, using `gform_post_submission_1`. If you want it to apply to all your forms, use `gform_post_submission`.

Place this function in `functions.php` (or wherever you keep your custom code) in your WordPress theme.

<pre>add_action
 ('gform_post_submission_1', 'remove_form_entry', 10, 2);

function remove_form_entry($entry, $form){
    
    // talk to the WordPress database
    global $wpdb;

    $lead_id = $entry['id'];

    // get the Gravity Forms table prefix, usually rg_
    $lead_table = 
     RGFormsModel::get_lead_table_name();
    $lead_notes_table = 
     RGFormsModel::get_lead_notes_table_name();
    $lead_detail_table = 
     RGFormsModel::get_lead_details_table_name();
    $lead_detail_long_table = 
     RGFormsModel::get_lead_details_long_table_name();

    //Delete from detail long
    $sql = $wpdb->prepare
     (" DELETE FROM $lead_detail_long_table
        WHERE lead_detail_id IN(
        SELECT id FROM $lead_detail_table WHERE lead_id=%d
      )", $lead_id);
    $wpdb->query($sql);

    //Delete from lead details
    $sql = $wpdb->prepare
     ("DELETE FROM $lead_detail_table
       WHERE lead_id=%d", $lead_id);
    $wpdb->query($sql);

    //Delete from lead notes
    $sql = $wpdb->prepare
     ("DELETE FROM $lead_notes_table
       WHERE lead_id=%d", $lead_id);
    $wpdb->query($sql);

    //Delete from lead
    $sql = $wpdb->prepare
     ("DELETE FROM $lead_table
       WHERE id=%d", $lead_id);
    $wpdb->query($sql);

}
</pre>

Please note: This code was originally posted by someone to <http://pastie.org/1435911#9>.