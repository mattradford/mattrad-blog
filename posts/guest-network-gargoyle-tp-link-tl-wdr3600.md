---
title: Add a guest network using Gargoyle on a TP-Link TL-WDR3600
date: 2014-06-23
eleventyExcludeFromCollections: true

---
I wanted to add a guest network to my router, which is a TP-Link WDR3600 running Gargoyle firmware. I&#8217;ve been able to add one using the following commands, and ensure it&#8217;s isolated from the rest of my wireless and wired networks.

> The WDR3600 is also known as the N600, and these instructions should also work for the N750 (WDR4300) and the N600 (WDR3500). If only TP-Link could make their product designations even more confusing&#8230; These instructions should also work for vanilla OpenWRT. 

Most of the below is taken from [pbix&#8217;s][1] instructions on [this Gargoyle forum post][2], with some trial and error.

First: `ssh root@192.168.1.1`

Then, add a new network using [OpenWRT&#8217;s uci system][3], which is a centralised way of configuring the router.

<pre># add the new wireless network
uci set wireless.ap_g2=wifi-iface
uci set wireless.ap_g2.device=radio0
uci set wireless.ap_g2.mode=ap
uci set wireless.ap_g2.network=lan

# name the SSID
uci set wireless.ap_g2.ssid=(your SSID)

# make sure clients are isolated from each other
uci set wireless.ap_g2.isolate=1

# you can set the below to "none" and omit the following uci command if you don't want password protection
uci set wireless.ap_g2.encryption=psk2
uci set wireless.ap_g2.key=(your password)

# save your changes
uci commit</pre>

We&#8217;ve already made clients isolated from one another (using `uci set wireless.ap_g2.isolate=1` above). Now we will set firewall rules to isolate guest network clients from other devices on existing wireless and wired networks.

So open up `/usr/lib/gargoyle_firewall_util/gargoyle_firewall_util.sh` and find the `initialize_firewall()` block.

<pre>initialize_firewall()
{
        # This part won't need any changes
        iptables -I zone_lan_forward -i br-lan -o br-lan -j ACCEPT
        insert_remote_accept_rules
        insert_dmz_rule
        create_l7marker_chain
        block_static_ip_mismatches
        force_router_dns
        add_adsl_modem_routes

        # Add the lines below to isolate the guest wifi from your LAN
        ebtables -I FORWARD -i wlan0-1 -o wlan0 -j DROP
        ebtables -I FORWARD -i wlan0-1 -o wlan1 -j DROP
        ebtables -I FORWARD -i wlan0-1 -o eth0.1 -j DROP

}</pre>

Finally, `reboot`. Once your router comes back up you should have a guest network in place.

I had a few problems adding a SSID with a space in it, e.g. &#8220;Guest Network&#8221;. I had to delete the whole config under `/etc/config/wireless` and start again (with a `reboot` in between), and call it &#8220;GuestNetwork&#8221;.

It&#8217;s not perfect, as this setup:

  * allows anyone on the guest network to see OpenVPN clients on that network, if you have OpenVPN configured
  * does not allow for specific bandwidth monitoring on the guest network, although you can set [QoS][4]
  * it messes with the GUI a bit, meaning that wireless settings have to be changed in `/etc/config/wireless`

But it all works and guests have their own slice of my network without seeing all the other devices on it.

 [1]: http://www.gargoyle-router.com/phpbb/memberlist.php?mode=viewprofile&u=450
 [2]: http://www.gargoyle-router.com/phpbb/viewtopic.php?f=13&t=2743&sid=f4c7f2b3ca0dc7ceeb78583ed79fa2c6
 [3]: http://wiki.openwrt.org/doc/uci
 [4]: http://www.gargoyle-router.com/wiki/doku.php?id=qos