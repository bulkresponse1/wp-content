<div class="mkd-tabs-navigation-wrapper">
    <ul class="nav nav-tabs">
        <?php
        foreach (cyberstore_mikado_options()->adminPages as $key => $page ) {
            $slug = "";
            if (!empty($page->slug)) $slug = "_tab".$page->slug;
            ?>
            <li<?php if ($page->slug == $tab) echo " class=\"active\""; ?>>
                <a href="<?php echo esc_url(get_admin_url().'admin.php?page=cyberstore_mikado_theme_menu'.$slug); ?>">
                    <?php if($page->icon !== '') { ?>
                        <i class="<?php echo esc_attr($page->icon); ?> mkd-tooltip mkd-inline-tooltip left" data-placement="top" data-toggle="tooltip" title="<?php echo esc_attr($page->title); ?>"></i>
                    <?php } ?>
                    <span><?php echo esc_html($page->title); ?></span>
                </a>
            </li>
        <?php
        }
        ?>
	    <?php if (cyberstore_mikado_core_plugin_installed()) { ?>
			<li <?php if($isBackupOptionsPage) { echo "class='active'"; } ?>><a href="<?php echo esc_url(get_admin_url().'admin.php?page=cyberstore_mikado_theme_menu_backup_options'); ?>"><i class="icon_drive mkd-tooltip mkd-inline-tooltip left" data-placement="top" data-toggle="tooltip" title="<?php esc_attr_e('Backup Options','cyberstore'); ?>"></i><span><?php esc_html_e('Backup Options','cyberstore'); ?></span></a></li>
	        <li <?php if($isImportPage) { echo "class='active'"; } ?>><a href="<?php echo esc_url(get_admin_url().'admin.php?page=cyberstore_mikado_theme_menu_tabimport'); ?>"><i class="icon_download mkd-tooltip mkd-inline-tooltip left" data-placement="top" data-toggle="tooltip" title="<?php esc_attr_e('Import','cyberstore'); ?>"></i><span><?php esc_html_e('Import','cyberstore'); ?></span></a></li>
	    <?php } ?>
    </ul>
</div>